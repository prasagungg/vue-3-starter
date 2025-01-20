<script setup lang="ts">
import { Breadcrumb } from '@/components/breadcrumb';
import { DataTable, DataTablePagination } from '@/components/datatable';
import { serviceFeeColumns } from '../service-fee.column';
import { useServiceFeeQuery } from '../composables';
import { computed, provide, reactive, ref } from 'vue';
import { SelectDateRange } from '@/components/select-date-range';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-vue-next';
import { ModalAddServiceFee, ModalSelectProduct } from '../components';

const breadcrumbs = [
  {
    name: 'Dashboard',
    routeName: 'dashboard',
  },
  {
    name: 'Laporan Biaya Layanan',
  },
];

const filter = reactive({
  page: 1,
  size: '10',
  acquirerCode: '',
  periodeAwal: '',
  periodeAkhir: '',
});

const { data, isLoading, refetch } = useServiceFeeQuery(filter);

provide('refetch', refetch);

const dataServiceFee = computed(() => {
  if (!data.value) return [];

  return data.value.content;
});

const modalAddServiceFeeRef = ref<InstanceType<typeof ModalAddServiceFee> | null>(null);

const openModalAdd = () => {
  if (modalAddServiceFeeRef.value) {
    modalAddServiceFeeRef.value.toggleModal(true);
  }
};

const selectedProduct = ref<{
  id: number;
  acquirerCode: string;
}>({
  id: 0,
  acquirerCode: '',
});
const modalSelectProductRef = ref<InstanceType<typeof ModalSelectProduct> | null>(null);

const openModalSelectProduct = (value: { id: number; acquirerCode: string }) => {
  if (modalSelectProductRef.value) {
    selectedProduct.value = value;
    modalSelectProductRef.value.toggleModal(true);
  }
};

provide('openModalSelectProduct', openModalSelectProduct);
</script>
<template>
  <Breadcrumb title="Laporan Biaya Layanan" :breadcrumbs="breadcrumbs" />
  <div class="bg-white rounded-2xl shadow-md p-4">
    <div class="flex py-4 items-center gap-4">
      <SelectDateRange
        v-model:start-date="filter.periodeAwal"
        v-model:end-date="filter.periodeAkhir"
      />
      <Button variant="outline" size="icon" @click="openModalAdd"><Plus /></Button>
    </div>
    <DataTable :columns="serviceFeeColumns" :data="dataServiceFee" :is-loading="isLoading" />
    <DataTablePagination
      :total="data?.total ?? 0"
      v-model:size="filter.size"
      v-model:page="filter.page"
    />
  </div>
  <ModalAddServiceFee ref="modalAddServiceFeeRef" />
  <ModalSelectProduct :row="selectedProduct" ref="modalSelectProductRef" />
</template>
