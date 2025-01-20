export type ConfirmDialogProviderProps = {
  show: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
};

export { default as ConfirmDialogProvider } from './ConfirmDialogProvider.vue';
