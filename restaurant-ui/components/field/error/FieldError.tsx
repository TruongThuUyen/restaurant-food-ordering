import { useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  className?: string;
};

const FieldError = ({ name, className }: Props) => {
  const {
    formState: { errors },
  } = useFormContext();

  if (!errors[name]) return null;

  return (
    <p className='mt-1 text-xs text-red-600 font-medium'>
      {errors[name]?.message?.toString() || 'This field is required'}
    </p>
  );
};

export default FieldError;
