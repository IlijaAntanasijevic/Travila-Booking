export interface IOpenAIConfig {
    currentActive: IOpenAIConfigData;
    previousConf: IOpenAIConfigData[];
}


export interface IOpenAIConfigData {
    id?: number;
    model: string;
    prompt: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }

  export interface IOpenAiUserConversation {
    id: number;
    title: string;
    createdAt: Date;
    model: string;
    messages: IOpenAiUserConversationData[];
  }

  export interface IOpenAiUserConversationData {
    id: number;
    conversationId: number;
    userId: number;
    userName: string;
    content: string;
    sender: string;
    createdAt: Date;
  }
