/**
 * DTO de entrada para el Use Case de actualizar usuario.
 * Contiene los datos que pueden ser actualizados.
 * Los campos son opcionales porque puede que no quieras actualizar todos.
 */
export interface UpdateUserInput {
  email?: string;
  password?: string;
}
