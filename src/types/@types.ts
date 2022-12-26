export interface DownloadCSVProps {
  data: User[];
}

export interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export interface User {
  id: number;
  name: string;
  role: string;
}

export interface PaginationProps {
  users: User[];
  onPageChange: (page: number) => void;
  currentPage: number;
}

export interface UserListHeaderProps {
  users: User[];
  handleCreate: () => void;
}
