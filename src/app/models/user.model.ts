export interface User {
  id: string;
  name: string;
  email: string;
  // A senha NUNCA deve ser guardada no frontend, por isso não está aqui.
  // Os novos campos que você pediu:
  age: number;
  profession: string;
  interests: string;
}