export interface IChatList {
    id: number;
    receiverId: number;
    fullName: string;
    lastChatMessage: Date;
    isRead: boolean;
}

export interface IMessages {
    id: number;
    senderId: number;
    receiverId: number;
    message: string;
    sentAt: Date;
    isRead: boolean;
    isMineMessage: boolean;
}