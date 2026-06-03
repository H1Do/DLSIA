import { Input } from 'antd';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export const ArticlesFilter = ({ value, onChange, onSearch }: Props) => {
  return (
    <Input.Search
      placeholder="Поиск по названию, описанию или автору..."
      allowClear
      size="large"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onSearch={onSearch}
      onPressEnter={onSearch}
      style={{ marginBottom: 24 }}
    />
  );
};