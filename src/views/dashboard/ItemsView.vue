<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-800 dark:text-white">
        Items Management
      </h1>
      <button
        @click="openCreateModal"
        class="flex items-center space-x-2 bg-primary dark:bg-dark-primary hover:bg-primary-hover dark:hover:bg-dark-primary-hover text-white py-2 px-4 rounded-md shadow-sm transition-colors duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        <span>Add Item</span>
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="relative col-span-2">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search items..."
          class="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-400 dark:text-gray-500 absolute left-3 top-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <div class="flex space-x-4">
        <select
          v-model="categoryFilter"
          class="appearance-none w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary cursor-pointer"
        >
          <option value="">All Categories</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
        <select
          v-model="sortBy"
          class="appearance-none w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary cursor-pointer"
        >
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
          <option value="stock">Sort by Stock</option>
          <option value="date">Sort by Date Added</option>
        </select>
      </div>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Item
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Price
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Stock
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody
            class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"
          >
            <tr
              v-for="item in filteredItems"
              :key="item.id"
              class="hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div
                    class="h-10 w-10 flex-shrink-0 rounded-md bg-gray-200 dark:bg-gray-600"
                  >
                    <img
                      v-if="item.picture"
                      :src="`https://pos-api.buahbibir.co.id/storage/pictures/${item.picture}`"
                      alt=""
                      class="h-10 w-10 rounded-md object-cover"
                    />
                    <div
                      v-else
                      class="h-10 w-10 rounded-md flex items-center justify-center text-gray-500 dark:text-gray-400"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div
                      class="text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {{ item.name }}
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      #{{ item.id }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                >
                  {{ item.category?.name || "Unknown" }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">
                  {{ formatCurrency(item.sell_price) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">
                  {{ item.quantity }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="{
                    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200':
                      item.quantity > 10,
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200':
                      item.quantity > 0 && item.quantity <= 10,
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200':
                      item.quantity === 0,
                  }"
                >
                  {{
                    item.quantity > 10
                      ? "In Stock"
                      : item.quantity > 0
                      ? "Low Stock"
                      : "Out of Stock"
                  }}
                </span>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2"
              >
                <button
                  @click="viewItem(item)"
                  class="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-dark-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
                <button
                  @click="editItem(item)"
                  class="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-dark-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button
                  @click="confirmDelete(item)"
                  class="text-gray-600 dark:text-gray-400 hover:text-red-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </td>
            </tr>
            <tr v-if="isLoading">
              <td
                colspan="6"
                class="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
              >
                <div class="flex justify-center items-center">
                  <svg
                    class="animate-spin h-5 w-5 mr-3 text-primary dark:text-dark-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading items...
                </div>
              </td>
            </tr>

            <tr v-if="showEmptyState">
              <td
                colspan="6"
                class="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
              >
                No items found matching your criteria
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        class="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6"
      >
        <div
          class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
        >
          <div>
            <p class="text-sm text-gray-700 dark:text-gray-400">
              Showing
              <span class="font-medium">{{ paginationStart }}</span>
              to
              <span class="font-medium">{{ paginationEnd }}</span>
              of
              <span class="font-medium">{{ filteredTotal }}</span>
              results
            </p>
          </div>
          <div>
            <nav
              class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                @click="
                  () => {
                    currentPage = Math.max(1, currentPage - 1);
                    fetchItems();
                  }
                "
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50"
              >
                <span class="sr-only">Previous</span>
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <template v-for="page in totalPages" :key="page">
                <button
                  v-if="
                    page === currentPage ||
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  "
                  @click="
                    () => {
                      currentPage = page;
                      fetchItems();
                    }
                  "
                  :class="[
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                    currentPage === page
                      ? 'z-10 bg-primary dark:bg-dark-primary border-primary dark:border-dark-primary text-white'
                      : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600',
                  ]"
                >
                  {{ page }}
                </button>
                <span
                  v-else-if="
                    page === currentPage - 2 || page === currentPage + 2
                  "
                  class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-400"
                >
                  ...
                </span>
              </template>
              <button
                @click="
                  () => {
                    currentPage = Math.min(totalPages, currentPage + 1);
                    fetchItems();
                  }
                "
                :disabled="currentPage === totalPages"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50"
              >
                <span class="sr-only">Next</span>
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-10 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75 transition-opacity"
          aria-hidden="true"
          @click="closeModal"
        ></div>

        <div
          class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <form @submit.prevent="saveItem">
            <div
              class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
            >
              <div class="sm:flex sm:items-start">
                <div class="w-full mt-3 text-center sm:mt-0 sm:text-left">
                  <h3
                    class="text-lg leading-6 font-medium text-gray-900 dark:text-white"
                    id="modal-title"
                  >
                    {{ isEditing ? "Edit Item" : "Add New Item" }}
                  </h3>
                  <div class="mt-4 space-y-4">
                    <div>
                      <label
                        for="name"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Name</label
                      >
                      <input
                        id="name"
                        v-model="currentItem.name"
                        type="text"
                        class="mt-1 px-3 py-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <label
                        for="company_name"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Company Name</label
                      >
                      <input
                        id="company_name"
                        v-model="currentItem.company_name"
                        type="text"
                        class="mt-1 px-3 py-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <label
                        for="supplier_id"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Supplier ID</label
                      >
                      <input
                        id="supplier_id"
                        v-model="currentItem.supplier_id"
                        type="number"
                        min="1"
                        class="mt-1 px-3 py-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <label
                        for="category"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Category</label
                      >
                      <select
                        id="category"
                        v-model="currentItem.category_id"
                        class="mt-1 block w-full py-2 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary text-gray-700 dark:text-white sm:text-sm"
                      >
                        <option
                          v-for="category in categories"
                          :key="category.id"
                          :value="category.id"
                        >
                          {{ category.name }}
                        </option>
                      </select>
                    </div>

                    <div>
                      <label
                        for="buy_price"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Buy Price</label
                      >
                      <div class="mt-1 relative rounded-md shadow-sm">
                        <div
                          class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                        >
                          <span
                            class="text-gray-500 dark:text-gray-400 sm:text-sm"
                          >
                            Rp
                          </span>
                        </div>
                        <input
                          id="buy_price"
                          v-model="currentItem.buy_price"
                          type="number"
                          min="0"
                          class="pl-8 pr-3 py-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        for="price"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Sell Price</label
                      >
                      <div class="mt-1 relative rounded-md shadow-sm">
                        <div
                          class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                        >
                          <span
                            class="text-gray-500 dark:text-gray-400 sm:text-sm"
                          >
                            Rp
                          </span>
                        </div>
                        <input
                          id="price"
                          v-model="currentItem.sell_price"
                          type="number"
                          min="0"
                          class="pl-8 pr-3 py-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        for="custom_tax"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Custom Tax (%)</label
                      >
                      <input
                        id="custom_tax"
                        v-model="currentItem.custom_tax"
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        class="mt-1 px-3 py-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
                        placeholder="0.00"
                      />
                    </div>

                    <div>
                      <label
                        for="point"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Points</label
                      >
                      <input
                        id="point"
                        v-model="currentItem.point"
                        type="number"
                        min="0"
                        step="0.01"
                        class="mt-1 px-3 py-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
                        placeholder="0.00"
                      />
                    </div>

                    <div>
                      <label
                        for="description"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Description</label
                      >
                      <textarea
                        id="description"
                        v-model="currentItem.description"
                        rows="3"
                        class="mt-1 px-3 py-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
                      ></textarea>
                    </div>

                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Image</label
                      >
                      <div class="mt-1 flex flex-col items-start space-y-2">
                        <div
                          class="w-full h-40 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-600"
                        >
                          <img
                            v-if="currentItem.picturePreview"
                            :src="currentItem.picturePreview"
                            class="h-full w-full object-cover object-center"
                          />
                          <img
                            v-else-if="currentItem.picture"
                            :src="`https://pos-api.buahbibir.co.id/storage/pictures/${currentItem.picture}`"
                            class="h-full w-full object-cover"
                          />
                          <div
                            v-else
                            class="h-full w-full flex items-center justify-center text-gray-300 dark:text-gray-500"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-16 w-16"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        </div>

                        <div class="flex items-center">
                          <input
                            type="file"
                            ref="fileInput"
                            accept="image/*"
                            class="hidden"
                            @change="handleFileUpload"
                          />
                          <button
                            type="button"
                            @click="$refs.fileInput.click()"
                            class="bg-white dark:bg-gray-700 py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-dark-primary"
                          >
                            {{
                              currentItem.picture || currentItem.picturePreview
                                ? "Change"
                                : "Upload"
                            }}
                          </button>

                          <button
                            v-if="currentItem.picturePreview || selectedFile"
                            type="button"
                            @click="clearImageSelection"
                            class="ml-2 bg-white dark:bg-gray-700 py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            Clear
                          </button>
                        </div>

                        <div
                          v-if="selectedFile"
                          class="text-sm text-gray-500 dark:text-gray-400"
                        >
                          Selected: {{ selectedFile.name }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
            >
              <button
                type="submit"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary dark:bg-dark-primary text-base font-medium text-white hover:bg-primary-hover dark:hover:bg-dark-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-dark-primary sm:ml-3 sm:w-auto sm:text-sm"
              >
                {{ isEditing ? "Save Changes" : "Create Item" }}
              </button>
              <button
                type="button"
                @click="closeModal"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div
      v-if="isViewModalOpen"
      class="fixed inset-0 z-10 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75 transition-opacity"
          aria-hidden="true"
          @click="closeViewModal"
        ></div>

        <div
          class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3
                  class="text-lg leading-6 font-medium text-gray-900 dark:text-white"
                  id="modal-title"
                >
                  Item Details
                </h3>
                <div class="mt-4">
                  <div class="aspect-w-4 aspect-h-3 mb-4">
                    <div
                      class="w-full h-40 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden"
                    >
                      <img
                        v-if="currentItem.picture"
                        :src="`https://pos-api.buahbibir.co.id/storage/pictures/${currentItem.picture}`"
                        class="w-full h-full object-cover"
                      />
                      <div
                        v-else
                        class="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-16 w-16"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                    <div>
                      <dt
                        class="text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        Name
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900 dark:text-white">
                        {{ currentItem.name }}
                      </dd>
                    </div>
                    <div>
                      <dt
                        class="text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        Category
                      </dt>
                      <dd class="mt-1">
                        <span
                          class="px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        >
                          {{ currentItem.category?.name || "Unknown" }}
                        </span>
                      </dd>
                    </div>
                    <div>
                      <dt
                        class="text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        Price
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900 dark:text-white">
                        {{ formatCurrency(currentItem.sell_price) }}
                      </dd>
                    </div>
                    <div>
                      <dt
                        class="text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        Stock
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900 dark:text-white">
                        {{ currentItem.quantity }} units
                      </dd>
                    </div>
                    <div class="sm:col-span-2">
                      <dt
                        class="text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        Description
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900 dark:text-white">
                        {{
                          currentItem.description || "No description available"
                        }}
                      </dd>
                    </div>
                    <div>
                      <dt
                        class="text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        Added On
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900 dark:text-white">
                        {{ formatDate(currentItem.created_at) }}
                      </dd>
                    </div>
                    <div>
                      <dt
                        class="text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        Status
                      </dt>
                      <dd class="mt-1">
                        <span
                          class="px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full"
                          :class="{
                            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200':
                              currentItem.quantity > 10,
                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200':
                              currentItem.quantity > 0 &&
                              currentItem.quantity <= 10,
                            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200':
                              currentItem.quantity === 0,
                          }"
                        >
                          {{
                            currentItem.quantity > 10
                              ? "In Stock"
                              : currentItem.quantity > 0
                              ? "Low Stock"
                              : "Out of Stock"
                          }}
                        </span>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div
            class="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
          >
            <button
              type="button"
              @click="editItem(currentItem)"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary dark:bg-dark-primary text-base font-medium text-white hover:bg-primary-hover dark:hover:bg-dark-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-dark-primary sm:ml-3 sm:w-auto sm:text-sm"
            >
              Edit
            </button>
            <button
              type="button"
              @click="closeViewModal"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="isDeleteModalOpen"
      class="fixed inset-0 z-10 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75 transition-opacity"
          aria-hidden="true"
          @click="closeDeleteModal"
        ></div>

        <div
          class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 sm:mx-0 sm:h-10 sm:w-10"
              >
                <svg
                  class="h-6 w-6 text-red-600 dark:text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  class="text-lg leading-6 font-medium text-gray-900 dark:text-white"
                  id="modal-title"
                >
                  Delete Item
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete "{{ currentItem.name }}"?
                    This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            class="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
          >
            <button
              type="button"
              @click="deleteItem"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Delete
            </button>
            <button
              type="button"
              @click="closeDeleteModal"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import apiService from "../../services/api";

const items = ref([]);
const categories = ref([]);
const totalItems = ref(0);
const isLoading = ref(true);
const error = ref(null);

const searchQuery = ref("");
const categoryFilter = ref("");
const sortBy = ref("name");
const sortDirection = ref("asc");
const currentPage = ref(1);
const itemsPerPage = ref(10);

const isModalOpen = ref(false);
const isViewModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const isEditing = ref(false);
const currentItem = ref({
  id: null,
  name: "",
  company_name: "",
  supplier_id: null,
  category_id: null,
  buy_price: 0,
  sell_price: 0,
  custom_tax: null,
  description: "",
  picture: null,
  point: 0,
  quantity: 0,
});

const fileInput = ref(null);
const selectedFile = ref(null);

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      currentItem.value.picturePreview = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const filteredItems = computed(() => {
  if (isLoading.value) {
    return [];
  }
  
  let filtered = items.value || [];
  
  if (categoryFilter.value) {
    filtered = filtered.filter(item => 
      item.category_id === parseInt(categoryFilter.value)
    );
  }
  
  return filtered;
});

const showEmptyState = computed(() => {
  return !isLoading.value && filteredItems.value.length === 0;
});

const clearImageSelection = () => {
  selectedFile.value = null;
  currentItem.value.picturePreview = null;
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};

const fetchItems = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    let column = "name";
    if (sortBy.value === "price") column = "sell_price";
    if (sortBy.value === "stock") column = "quantity";
    if (sortBy.value === "date") column = "created_at";

    const response = await apiService.getItems({
      limit: itemsPerPage.value,
      page: currentPage.value,
      column: column,
      direction: sortDirection.value,
      search: searchQuery.value || undefined,
    });

    items.value = response.data.data.data;
    totalItems.value = response.data.data.total;
    currentPage.value = response.data.data.current_page;

    fetchCategories();
  } catch (err) {
    error.value = "Failed to load items. Please try again.";
  } finally {
    isLoading.value = false;
  }
};

const fetchCategories = async () => {
  try {
    const response = await apiService.getCategories({
      limit: 100,
      column: 'name',
      direction: 'asc',
    });
    
    if (response && response.data && response.data.data) {
      categories.value = response.data.data.data || [];
    } else {
      console.error('Unexpected API response structure for categories:', response);
      categories.value = [];
    }
  } catch (err) {
    console.error('Error fetching categories:', err);
    categories.value = [];
  }
};

const formatCurrency = (value) => {
  const rupiah = value * 1000;

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(rupiah);
};

const prepareItemForAPI = (item) => {
  const preparedItem = { ...item };
  preparedItem.sell_price = parseFloat(
    (preparedItem.sell_price / 1000).toFixed(2)
  );
  return preparedItem;
};

const prepareItemForUI = (item) => {
  const preparedItem = { ...item };
  preparedItem.sell_price_display = preparedItem.sell_price * 1000;
  return preparedItem;
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid date";

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Date error";
  }
};

const toggleSort = (column) => {
  if (sortBy.value === column) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortBy.value = column;
    sortDirection.value = "asc";
  }
  fetchItems();
};

const totalPages = computed(() => {
  return Math.ceil(totalItems.value / itemsPerPage.value) || 1;
});

const paginationStart = computed(() => {
  if (filteredItems.value.length === 0) return 0;
  
  if (categoryFilter.value) {
    return 1;
  }
  
  return (currentPage.value - 1) * itemsPerPage.value + 1;
});

const paginationEnd = computed(() => {
  if (filteredItems.value.length === 0) return 0;
  
  if (categoryFilter.value) {
    return filteredItems.value.length;
  }
  
  return Math.min(currentPage.value * itemsPerPage.value, totalItems.value);
});

const filteredTotal = computed(() => {
  if (categoryFilter.value) {
    return filteredItems.value.length;
  }
  return totalItems.value;
});

watch(
  [searchQuery],
  () => {
    currentPage.value = 1;
    fetchItems();
  },
  { immediate: false }
);

watch(categoryFilter, () => {
}, { immediate: false });

watch(
  [sortBy, sortDirection],
  () => {
    fetchItems();
  },
  { immediate: false }
);

const openCreateModal = () => {
  isEditing.value = false;
  currentItem.value = {
    id: null,
    name: "",
    company_name: "",
    supplier_id: null,
    category_id: categories.value.length ? categories.value[0].id : null,
    buy_price: 0,
    sell_price: 0,
    custom_tax: null,
    description: "",
    picture: null,
    picturePreview: null,
    point: 0,
  };
  selectedFile.value = null;
  if (fileInput.value) {
    fileInput.value.value = "";
  }
  isModalOpen.value = true;
};

const editItem = (item) => {
  isEditing.value = true;
  currentItem.value = {
    ...item,
    buy_price: item.buy_price * 1000,
    sell_price: item.sell_price * 1000,
  };
  selectedFile.value = null;
  if (fileInput.value) {
    fileInput.value.value = "";
  }
  isViewModalOpen.value = false;
  isModalOpen.value = true;
};

const viewItem = (item) => {
  currentItem.value = { ...item };
  isViewModalOpen.value = true;
};

const confirmDelete = (item) => {
  currentItem.value = { ...item };
  isDeleteModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const closeViewModal = () => {
  isViewModalOpen.value = false;
};

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false;
};

const saveItem = async () => {
  try {
    const formData = new FormData();

    const itemForAPI = { ...currentItem.value };

    if (itemForAPI.buy_price) {
      itemForAPI.buy_price = parseFloat(
        (itemForAPI.buy_price / 1000).toFixed(2)
      );
    }
    if (itemForAPI.sell_price) {
      itemForAPI.sell_price = parseFloat(
        (itemForAPI.sell_price / 1000).toFixed(2)
      );
    }

    delete itemForAPI.picturePreview;

    Object.keys(itemForAPI).forEach((key) => {
      if (
        key !== "picture" &&
        itemForAPI[key] !== null &&
        itemForAPI[key] !== undefined
      ) {
        formData.append(key, itemForAPI[key]);
      }
    });

    if (selectedFile.value) {
      formData.append("picture", selectedFile.value);
    }

    if (isEditing.value) {
      await apiService.updateItem(itemForAPI.id, formData);
    } else {
      await apiService.createItem(formData);
    }

    closeModal();
    fetchItems();
  } catch (err) {
    console.error("Error saving item:", err);
    error.value = "Failed to save item. Please try again.";
  }
};

const deleteItem = async () => {
  try {
    await apiService.deleteItem(currentItem.value.id);
    closeDeleteModal();
    fetchItems();
  } catch (err) {
    console.error("Error deleting item:", err);
    error.value = "Failed to delete item. Please try again.";
  }
};

onMounted(() => {
  fetchItems();
  fetchCategories();
});
</script>
