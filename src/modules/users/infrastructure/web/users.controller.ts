import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { FindAllUserUseCase } from '../../application/use-cases/find-all-users.use-case';
import { FindUserByIdUseCase } from '../../application/use-cases/find-user-by-id.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from '../../application/use-cases/delete-user.use-case';
import { CreateUserHttpDto } from './dto/create-user.http.dto';
import { UpdateUserHttpDto } from './dto/update-user.http.dto';
import { UserHttpMapper } from './mappers/user-http.mapper';
import { PaginationInput } from '../../application/inputs/pagination.input';

/**
 * Controlador HTTP para gestionar usuarios.
 * Maneja las solicitudes HTTP y delega la lógica de negocio a los Use Cases.
 */
@Controller('users')
export class UsersController {
  constructor(
    private readonly findAllUserUseCase: FindAllUserUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  /**
   * POST /users
   * Crea un nuevo usuario
   * @param dto - Datos del usuario a crear
   * @returns Usuario creado
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateUserHttpDto) {
    const user = await this.createUserUseCase.execute({
      email: dto.email,
      password: dto.password,
    });

    return UserHttpMapper.toResponse(user);
  }

  /**
   * GET /users
   * Obtiene usuarios con paginación
   * @query page - Número de página (default: 1)
   * @query limit - Elementos por página (default: 10)
   * @returns Lista paginada de usuarios
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() pagination: PaginationInput) {
    const result = await this.findAllUserUseCase.execute(pagination);
    return {
      ...result,
      data: result.data.map(UserHttpMapper.toResponse),
    };
  }

  /**
   * GET /users/:id
   * Obtiene un usuario por su ID
   * @param id - ID del usuario
   * @returns Usuario encontrado
   */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.findUserByIdUseCase.execute(id);
    return UserHttpMapper.toResponse(user);
  }

  /**
   * PATCH /users/:id
   * Actualiza un usuario existente
   * @param id - ID del usuario a actualizar
   * @param dto - Datos a actualizar
   * @returns Usuario actualizado
   */
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserHttpDto,
  ) {
    const user = await this.updateUserUseCase.execute(id, {
      email: dto.email,
      password: dto.password,
    });

    return UserHttpMapper.toResponse(user);
  }

  /**
   * DELETE /users/:id
   * Elimina un usuario
   * @param id - ID del usuario a eliminar
   * @returns Sin contenido
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.deleteUserUseCase.execute(id);
  }
}
