<template>
  <div>
    <h1 class="text-xl text-center">מתכונים!</h1>

    <UForm
      :state="filter"
      @submit.prevent
      class="flex gap-5 justify-center my-5"
    >
      <UFormGroup label="חיפוש" name="q">
        <UInput v-model="filter.q" autofocus />
      </UFormGroup>

      <UFormGroup label="בשרי/חלבי/פרווה" name="meaty_or_dairy">
        <USelectMenu v-model="filter.meaty_or_dairy" :options="meaty_or_dairy" multiple placeholder="נא לבחור" />
      </UFormGroup>
    </UForm>

    <UTable
      :columns="columns"
      :rows="items"
      :loading="recipes.loading"
      :loadingState="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'טוען...' }"
    >
      <template #name-data="{ row }">
        <a :href="row.link" target="_blank" class="block hover:underline">
          {{ formatTime(row.name) }}
        </a>
      </template>

      <template #work_time-data="{ row }">
        {{ formatTime(row.work_time) }}
      </template>

      <template #empty-state>
        <div class="flex flex-col items-center justify-center py-6 gap-3">
          <span class="italic text-sm">לא נמצאו מתכונים מתאימים</span>
          <UButton label="איפוס חיפוש" @click="refreshPage" />
        </div>
      </template>
    </UTable>
  </div>
</template>

<script setup lang="ts">
  import { useRecipesStore } from '@/stores/recipes';

  const KEYS_IN_DB = {
    name: 0,
    link: 1,
    meaty_or_dairy: 2,
    type: 3,
    work_time: 4,
    total_time: 5,
    ingredients_partial: 6,
  };

  const meaty_or_dairy = [
    'בשרי',
    'חלבי',
    'פרווה',
  ];

  const recipes = useRecipesStore();

  const columns = [
    { key: 'name', label: 'שם', keyInDb: KEYS_IN_DB.name },
    { key: 'type', label: 'סוג', keyInDb: KEYS_IN_DB.type },
    { key: 'meaty_or_dairy', label: 'בשרי/חלבי/פרווה', keyInDb: KEYS_IN_DB.meaty_or_dairy },
    { key: 'work_time', label: 'זמן עבודה', keyInDb: KEYS_IN_DB.work_time },
    { key: 'total_time', label: 'זמן כולל', keyInDb: KEYS_IN_DB.total_time },
    { key: 'ingredients_partial', label: 'מרכיבים מיוחדים', keyInDb: KEYS_IN_DB.ingredients_partial },
  ];

  const filter = ref({
    q: '',
    meaty_or_dairy: [],
  });

  const items = computed(() => {
    let arr = recipes.items;


    if (![0, meaty_or_dairy.length].includes(filter.value.meaty_or_dairy.length)) {
      arr = arr.filter((item) => filter.value.meaty_or_dairy.includes(item[KEYS_IN_DB.meaty_or_dairy]));
    }

    if (filter.value.q.trim() !== '') {
      arr = arr.filter((item) => item[KEYS_IN_DB.name].includes(filter.value.q.trim()));
    }

    arr = arr.map((item) => {
      const newItem = {
        link: item[KEYS_IN_DB.link],
      };

      columns.forEach(col => {
        (newItem as any)[col.key] = item[col.keyInDb];
      });

      return newItem;
    });

    return arr;
  });

  onMounted(() => {
    recipes.fetchRecipes();
  });

  const formatTime = (minute) => {
    if (Number(minute) != minute || !(minute > 0) ) {
      return minute;
    }

    // const map = {
    //   // 30: 'חצי שעה',
    // };

    // if (minute in map) {
    //   return map[minute];
    // }

    if (minute < 60) {
      return `${minute} ד'`;
    }

    return `${Math.floor(minute / 60)}:${String(minute % 60).padStart(2, '0')} ש'`;
  };

  const refreshPage = () => window.location.reload();

</script>
