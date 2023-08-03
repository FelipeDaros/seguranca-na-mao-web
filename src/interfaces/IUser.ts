export interface IUser {
    token: string;
    isChecked: boolean;
    user: {
      id: string;
      nome: string;
      email: string;
      created_at: Date;
      ultimoLogin: Date;
      isAdmin: boolean;
      empresa_id: number;
    };
  }