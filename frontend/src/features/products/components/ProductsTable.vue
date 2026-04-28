<script setup lang="ts">
import { Eye, Pencil, Trash2 } from "lucide-vue-next";
import type { Product } from "@/types/product";
import { formatDate } from "@/utils/date";
import { truncate } from "@/utils/string";
import { formatCurrency } from "@/utils/number";

type Props = {
  products: Product[];
};

const props = defineProps<Props>();

const emit = defineEmits<{
  view: [product: Product];
  edit: [product: Product];
  remove: [product: Product];
}>();

// local helpers removed — using shared utils
</script>

<template>
  <div class="overflow-x-auto rounded-xl border border-zinc-200">
    <VTable class="min-w-[760px]">
      <thead>
        <tr>
          <th class="text-left">Nome</th>
          <th class="text-left">Descrição</th>
          <th class="text-left">Preço</th>
          <th class="text-left">Lançamento</th>
          <th class="text-right">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(product, index) in props.products"
          :key="product.id"
          :class="index % 2 === 0 ? 'bg-white' : 'bg-zinc-50/70'"
        >
          <td class="font-medium text-zinc-900">{{ product.name }}</td>
          <td :title="product.description || '-'" class="max-w-[420px]">
            {{ truncate(product.description, 120) }}
          </td>
          <td>{{ formatCurrency(product.price) }}</td>
          <td>{{ formatDate(product.created_at) }}</td>
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
                    @click="emit('view', product)"
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
                    @click="emit('edit', product)"
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
                    @click="emit('remove', product)"
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
