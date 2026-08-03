import {
  type MutationFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface UseNoteMutationProps<TData, TVariables> {
  mutationFn: MutationFunction<TData, TVariables>;
  successMessage: string;
  errorMessage: string;
  onSuccess?: () => void;
}

export const useMutationWithToast = <TData, TVariables>({
  mutationFn,
  successMessage,
  errorMessage,
  onSuccess,
}: UseNoteMutationProps<TData, TVariables>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success(successMessage);
      onSuccess?.();
    },
    onError: () => {
      toast.error(errorMessage);
    },
  });
};
