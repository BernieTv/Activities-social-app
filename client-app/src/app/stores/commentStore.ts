import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { makeAutoObservable, runInAction } from 'mobx';

import { ChatComment } from '../models/comment';
import { store } from './store';

export default class CommentStore {
  comments: ChatComment[] = [];
  hubConnection: HubConnection | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  createHubConnection = (activityId: string) => {
    if (store.activityStore.selectedActivity) {
      this.hubConnection = new HubConnectionBuilder()
        .withUrl(`http://localhost:5000/chat?activityId=${activityId}`, {
          accessTokenFactory: () => {
            if (store.userStore.user?.token) {
              return store.userStore.user?.token;
            }

            return '';
          },
        })
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

      this.hubConnection
        .start()
        .catch((error) => console.log('Error establishing the connection: ', error));

      this.hubConnection.on('LoadComments', (comment: ChatComment[]) => {
        runInAction(() => {
          this.comments = comment;
        });
      });

      this.hubConnection.on('ReceiveComment', (comment: ChatComment) => {
        runInAction(() => {
          this.comments.push(comment);
        });
      });
    }
  };

  stopHubConnection = () => {
    this.hubConnection?.stop().catch((error) => console.log('Error stopping connection: ', error));
  };

  clearComments = () => {
    this.comments = [];
    this.stopHubConnection();
  };

  addComment = async (values: { body: string; activityId?: string }) => {
    values.activityId = store.activityStore.selectedActivity?.id;

    try {
      await this.hubConnection?.invoke('SendComment', values);
    } catch (error) {
      console.log(error);
    }
  };
}
