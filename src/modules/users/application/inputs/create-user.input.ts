// No debe tener reglas de negocio
// No debe tener nada relacionado a HTTP, ni decoradores
// Es puro -> Forma parte de Aplication o la capa de aplicación
export interface CreateUserInput {
  email: string;
  password: string;
}
