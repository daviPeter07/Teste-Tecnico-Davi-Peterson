<script setup lang="ts">
import { Eye, Pencil, Trash2 } from "lucide-vue-next";
import type { User } from "@/types/user";
import { formatCpf } from "@/utils/cpf";

type Props = {
  users: User[];
};

const props = defineProps<Props>();

const emit = defineEmits<{
  view: [user: User];
  edit: [user: User];
  remove: [user: User];
}>();
</script>

<template>
  <div class="overflow-x-auto rounded-xl border border-zinc-200">
    <VTable class="min-w-[700px]">
      <thead>
        <tr>
          <th class="text-left">Nome</th>
          <th class="text-left">E-mail</th>
          <th class="text-left">CPF</th>
          <th class="text-right">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(user, index) in props.users"
          :key="user.id"
          :class="index % 2 === 0 ? 'bg-white' : 'bg-zinc-50/70'"
        >
          <td class="font-medium text-zinc-900">{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ formatCpf(user.cpf) }}</td>
          <td>
            <div class="flex justify-end gap-2">
              <VTooltip text="Visualizar" location="top">
                <template #activator="{ props: tooltipProps }">
                  <VBtn
                    v-bind="tooltipProps"
                    icon
                    size="small"
                    variant="text"
                    class="text-emerald-600 hover:bg-emerald-50"
                    @click="emit('view', user)"
                  >
                    <Eye :size="18" />
                  </VBtn>
                </template>
              </VTooltip>

              <VTooltip text="Editar" location="top">
                <template #activator="{ props: tooltipProps }">
                  <VBtn
                    v-bind="tooltipProps"
                    icon
                    size="small"
                    variant="text"
                    class="text-blue-600 hover:bg-blue-50"
                    @click="emit('edit', user)"
                  >
                    <Pencil :size="18" />
                  </VBtn>
                </template>
              </VTooltip>

              <VTooltip text="Excluir" location="top">
                <template #activator="{ props: tooltipProps }">
                  <VBtn
                    v-bind="tooltipProps"
                    icon
                    size="small"
                    variant="text"
                    class="text-rose-600 hover:bg-rose-50"
                    @click="emit('remove', user)"
                  >
                    <Trash2 :size="18" />
                  </VBtn>
                </template>
              </VTooltip>
            </div>
          </td>
        </tr>
      </tbody>
    </VTable>
  </div>
</template>
