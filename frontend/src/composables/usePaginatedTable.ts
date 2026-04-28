import { computed, onScopeDispose, ref } from "vue";
import { paginationPerPageOptions } from "@/constants/table";
import type { UsePaginatedTableOptions } from "@/types/table";

export function usePaginatedTable(options: UsePaginatedTableOptions = {}) {
  const page = ref(options.initialPage ?? 1);
  const perPage = ref(
    options.initialPerPage ?? paginationPerPageOptions[0],
  );
  const search = ref(options.initialSearch ?? "");
  const debouncedSearch = ref(options.initialSearch ?? "");
  const filter = ref<string | number | null>(options.initialFilter ?? null);

  let searchTimeout: ReturnType<typeof setTimeout> | undefined;

  const syncDebouncedSearch = (nextSearch: string) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    searchTimeout = setTimeout(() => {
      debouncedSearch.value = nextSearch;
    }, 350);
  };

  onScopeDispose(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
  });

  const queryParams = computed(() => {
    const params: Record<string, string | number> = {
      page: page.value,
      per_page: perPage.value,
    };

    if (debouncedSearch.value.trim()) {
      params.search = debouncedSearch.value.trim();
    }

    if (filter.value !== null && filter.value !== "") {
      params.filter = filter.value;
    }

    return params;
  });

  const setPage = (nextPage: number) => {
    page.value = nextPage;
  };

  const setPerPage = (nextPerPage: number) => {
    perPage.value = nextPerPage;
    page.value = 1;
  };

  const setSearch = (nextSearch: string) => {
    search.value = nextSearch;
    page.value = 1;
    syncDebouncedSearch(nextSearch);
  };

  const setFilter = (nextFilter: string | number | null) => {
    filter.value = nextFilter;
    page.value = 1;
  };

  const resetTableState = () => {
    page.value = 1;
    perPage.value = options.initialPerPage ?? paginationPerPageOptions[0];
    search.value = "";
    filter.value = null;
  };

  return {
    page,
    perPage,
    search,
    debouncedSearch,
    filter,
    queryParams,
    setPage,
    setPerPage,
    setSearch,
    setFilter,
    resetTableState,
  };
}
