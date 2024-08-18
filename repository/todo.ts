import { data } from 'autoprefixer'
import type { NitroFetchRequest, $Fetch } from 'nitropack'

export type Todo = {
  title: string
  description: string
  id?: string
  ownerId?: string
  ownerUsername?: string
  createdAt?: string
  updatedAt?: string
}

type TodoResponse = {
  description: string
  id: string
  title: string
  created_by: {
    id: string
    username: string
  }
  created_at: string
  updated_at: string
}

type TodoFetchResponse = {
  isSuccess: boolean
}
interface TodoFetchAllResponse extends TodoFetchResponse {
  data: TodoResponse[]
}
interface TodoFetchOneResponse extends TodoFetchResponse {
  data: TodoResponse
}

export class TodoRepository {
  private API_ENDPOINT = '/api/todo'
  private fetch: $Fetch<string, NitroFetchRequest>

  constructor() {
    const { $todoFetch } = useNuxtApp()
    this.fetch = $todoFetch
  }

  public async create(item: Todo) {
    return await this.fetch<TodoFetchOneResponse>(this.API_ENDPOINT, {
      method: 'POST',
      body: item,
    })
  }

  public async getAll(): Promise<Todo[]> {
    const { data } = await this.fetch<TodoFetchAllResponse>(this.API_ENDPOINT, {
      method: 'GET',
    })

    return data.map((item) => this.transformToTodo(item))
  }

  public async getById(id: string): Promise<Todo> {
    const { data } = await this.fetch<TodoFetchOneResponse>(
      `${this.API_ENDPOINT}/${id}`,
      {
        method: 'GET',
      }
    )

    return this.transformToTodo(data)
  }

  public async edit(id: string, item: Todo): Promise<Todo | undefined> {
    const { data } = await this.fetch<TodoFetchOneResponse>(
      `${this.API_ENDPOINT}/${id}`,
      {
        method: 'PATCH',
        body: item,
      }
    )

    return this.transformToTodo(data)
  }

  public async delete(id: string): Promise<TodoFetchResponse> {
    return await this.fetch<TodoFetchResponse>(`${this.API_ENDPOINT}/${id}`, {
      method: 'DELETE',
    })
  }

  private transformToTodo(item: TodoResponse): Todo {
    const { id, title, description, created_by, created_at, updated_at } = item
    return {
      id,
      title,
      description,
      ownerId: created_by.id,
      ownerUsername: created_by.username,
      createdAt: created_at,
      updatedAt: updated_at,
    }
  }
}
