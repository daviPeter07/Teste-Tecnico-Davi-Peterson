<script setup lang="ts">
import { Pencil, Trash2 } from "lucide-vue-next";
import type { User } from "@/types/user";

type Props = {
  users: User[];
};

const props = defineProps<Props>();

const emit = defineEmits<{
  edit: [user: User];
  remove: [user: User];
}>();
</script>

<template>
  <VTable class="rounded-xl border border-zinc-200">
    <thead>
      <tr>
        <th class="text-left">Nome</th>
        <th class="text-left">E-mail</th>
        <th class="text-left">CPF</th>
        <th class="text-right">Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in props.users" :key="user.id">
        <td class="font-medium text-zinc-900">{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.cpf }}</td>
        <td>
          <div class="flex justify-end gap-2">
            <VBtn size="small" variant="outlined" color="secondary" @click="emit('edit', user)">
              <Pencil :size="14" class="mr-1" />
              Editar
            </VBtn>
            <VBtn size="small" variant="outlined" color="error" @click="emit('remove', user)">
              <Trash2 :size="14" class="mr-1" />
              Excluir
            </VBtn>
          </div>
        </td>
      </tr>
    </tbody>
  </VTable>
</template>
