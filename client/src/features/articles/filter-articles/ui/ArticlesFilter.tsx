import { Input } from 'antd';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const ArticlesFilter = ({ value, onChange }: Props) => {
  return (
    <Input.Search
      placeholder="Поиск по названию, описанию или автору..."
      allowClear
      size="large"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onSearch={onChange}
      style={{ marginBottom: 24 }}
    />
  );
};