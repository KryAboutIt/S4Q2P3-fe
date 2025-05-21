<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-800 dark:text-white">
        Logistics Management
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
        <span>Add Logistics</span>
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="relative col-span-2">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search logistics..."
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
          v-model="sortBy"
          class="appearance-none w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary cursor-pointer"
        >
          <option value="created_at">Sort by Date</option>
          <option value="final_price">Sort by Price</option>
          <option value="total_quantity">Sort by Quantity</option>
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
                ID
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Supplier
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Delivery Service
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Quantity
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
                Date
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
            <tr v-if="isLoading">
              <td
                colspan="7"
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
                  Loading logistics...
                </div>
              </td>
            </tr>
            <tr v-else-if="error">
              <td colspan="7" class="px-6 py-4 text-center text-red-500">
                {{ error }}
              </td>
            </tr>
            <tr v-else-if="filteredLogistics.length === 0 && !isLoading">
              <td
                colspan="7"
                class="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
              >
                No logistics found matching your criteria
              </td>
            </tr>
            <tr
              v-else
              v-for="logistic in filteredLogistics"
              :key="logistic.id"
              class="hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">
                  #{{ logistic.id }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="ml-4">
                    <div
                      class="text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {{ logistic.supplier.first_name }}
                      {{ logistic.supplier.last_name }}
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      {{ logistic.supplier.company_name }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">
                  {{ logistic.delivery_service }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">
                  {{ formatNumber(logistic.total_quantity) }} items
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">
                  {{ formatCurrency(logistic.final_price) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">
                  {{ formatDate(logistic.created_at) }}
                </div>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2"
              >
                <button
                  @click="viewLogistic(logistic)"
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
                  @click="confirmDelete(logistic)"
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
              <span class="font-medium">{{ totalLogistics }}</span>
              results
            </p>
          </div>
          <div>
            <nav
              class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                @click="currentPage = Math.max(1, currentPage - 1)"
                :disabled="currentPage === 1 || isLoading"
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
                  @click="currentPage = page"
                  :disabled="isLoading"
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
                @click="currentPage = Math.min(totalPages, currentPage + 1)"
                :disabled="currentPage === totalPages || isLoading"
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
          class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full"
        >
          <div class="max-h-[80vh] flex flex-col">
            <div
              class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 overflow-y-auto"
            >
              <div
                v-if="isLoadingLogisticDetails"
                class="flex justify-center items-center py-12"
              >
                <svg
                  class="animate-spin h-10 w-10 text-primary dark:text-dark-primary"
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
                <span class="ml-3 text-gray-600 dark:text-gray-300"
                  >Loading logistics details...</span
                >
              </div>

              <div v-else class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <h3
                    class="text-lg leading-6 font-medium text-gray-900 dark:text-white"
                    id="modal-title"
                  >
                    Logistics Details
                  </h3>

                  <div class="mt-4">
                    <dl class="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-6">
                      <div>
                        <dt
                          class="text-sm font-medium text-gray-500 dark:text-gray-400"
                        >
                          ID
                        </dt>
                        <dd
                          class="mt-1 text-sm text-gray-900 dark:text-white font-medium"
                        >
                          #{{ currentLogistic.id }}
                        </dd>
                      </div>
                      <div>
                        <dt
                          class="text-sm font-medium text-gray-500 dark:text-gray-400"
                        >
                          Date
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 dark:text-white">
                          {{ formatDate(currentLogistic.created_at) }}
                        </dd>
                      </div>
                      <div>
                        <dt
                          class="text-sm font-medium text-gray-500 dark:text-gray-400"
                        >
                          Total Price
                        </dt>
                        <dd
                          class="mt-1 text-sm text-gray-900 dark:text-white font-bold"
                        >
                          {{ formatCurrency(currentLogistic.final_price) }}
                        </dd>
                      </div>
                      <div class="sm:col-span-2">
                        <dt
                          class="text-sm font-medium text-gray-500 dark:text-gray-400"
                        >
                          Supplier
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 dark:text-white">
                          {{ currentLogistic.supplier?.first_name }}
                          {{ currentLogistic.supplier?.last_name }}
                          <span class="text-gray-500 dark:text-gray-400">
                            ({{ currentLogistic.supplier?.company_name }})
                          </span>
                        </dd>
                      </div>
                      <div>
                        <dt
                          class="text-sm font-medium text-gray-500 dark:text-gray-400"
                        >
                          Total Items
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 dark:text-white">
                          {{ formatNumber(currentLogistic.total_quantity) }}
                          items
                        </dd>
                      </div>
                      <div class="sm:col-span-3">
                        <dt
                          class="text-sm font-medium text-gray-500 dark:text-gray-400"
                        >
                          Delivery Service
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 dark:text-white">
                          {{ currentLogistic.delivery_service }}
                        </dd>
                      </div>
                    </dl>

                    <!-- Items Table -->
                    <div class="mt-6">
                      <h4
                        class="text-md font-medium text-gray-900 dark:text-white mb-3"
                      >
                        Items
                      </h4>
                      <div
                        class="border dark:border-gray-700 rounded-md overflow-hidden"
                      >
                        <table
                          class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                        >
                          <thead class="bg-gray-50 dark:bg-gray-700">
                            <tr>
                              <th
                                scope="col"
                                class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase"
                              >
                                Item
                              </th>
                              <th
                                scope="col"
                                class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase"
                              >
                                Quantity
                              </th>
                              <th
                                scope="col"
                                class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase"
                              >
                                Buy Price
                              </th>
                              <th
                                scope="col"
                                class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase"
                              >
                                Tax (%)
                              </th>
                              <th
                                scope="col"
                                class="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase"
                              >
                                Final Price
                              </th>
                            </tr>
                          </thead>
                          <tbody
                            class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"
                          >
                            <tr
                              v-for="item in currentLogistic.logistic_details"
                              :key="item.id"
                            >
                              <td class="px-4 py-3 whitespace-nowrap">
                                <div class="flex items-center">
                                  <div class="flex-shrink-0 h-10 w-10">
                                    <img
                                      class="h-10 w-10 rounded-md object-cover"
                                      :src="`https://pos-api.buahbibir.co.id/storage/pictures/${item.item.picture}`"
                                      :alt="item.item.name"
                                    />
                                  </div>
                                  <div class="ml-4">
                                    <div
                                      class="text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                      {{ item.item.name }}
                                    </div>
                                    <div
                                      class="text-xs text-gray-500 dark:text-gray-400"
                                    >
                                      {{ item.item.company_name }}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td class="px-4 py-3 whitespace-nowrap">
                                <div
                                  class="text-sm text-gray-900 dark:text-white"
                                >
                                  {{ formatNumber(item.quantity) }}
                                </div>
                              </td>
                              <td class="px-4 py-3 whitespace-nowrap">
                                <div
                                  class="text-sm text-gray-900 dark:text-white"
                                >
                                  {{ formatCurrency(item.buy_price) }}
                                </div>
                              </td>
                              <td class="px-4 py-3 whitespace-nowrap">
                                <div
                                  class="text-sm text-gray-900 dark:text-white"
                                >
                                  {{ item.tax }}%
                                </div>
                              </td>
                              <td
                                class="px-4 py-3 whitespace-nowrap text-right"
                              >
                                <div
                                  class="text-sm font-medium text-gray-900 dark:text-white"
                                >
                                  {{ formatCurrency(item.final_price) }}
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse flex-shrink-0"
            >
              <button
                type="button"
                @click="editLogistic(currentLogistic)"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary dark:bg-dark-primary text-base font-medium text-white hover:bg-primary-hover dark:hover:bg-dark-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-dark-primary sm:ml-3 sm:w-auto sm:text-sm"
                :disabled="isLoadingLogisticDetails"
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
                  Delete Logistics Record
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete logistics record #{{
                      currentLogistic.id
                    }}? This action cannot be undone.
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
              @click="deleteLogistic"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              :disabled="isDeleting"
            >
              <svg
                v-if="isDeleting"
                class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
              {{ isDeleting ? "Deleting..." : "Delete" }}
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

    <div
      v-if="isCreateModalOpen"
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
          @click="closeCreateModal"
        ></div>

        <div
          class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
        >
          <form
            @submit.prevent="submitLogistic"
            class="max-h-[calc(100vh-8rem)] flex flex-col"
          >
            <div
              class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 overflow-y-auto"
            >
              <div class="sm:flex sm:items-start">
                <div class="w-full mt-3 text-center sm:mt-0 sm:text-left">
                  <h3
                    class="text-lg leading-6 font-medium text-gray-900 dark:text-white"
                    id="modal-title"
                  >
                    Create New Logistics Record
                  </h3>

                  <div
                    v-if="createErrors.length"
                    class="mt-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md p-4"
                  >
                    <div class="flex">
                      <div class="flex-shrink-0">
                        <svg
                          class="h-5 w-5 text-red-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                      <div class="ml-3">
                        <h3
                          class="text-sm font-medium text-red-800 dark:text-red-200"
                        >
                          Please correct the following errors:
                        </h3>
                        <div
                          class="mt-2 text-sm text-red-700 dark:text-red-300"
                        >
                          <ul class="list-disc pl-5 space-y-1">
                            <li
                              v-for="(error, index) in createErrors"
                              :key="index"
                            >
                              {{ error }}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="mt-4 space-y-6">
                    <!-- Supplier Selection -->
                    <div>
                      <label
                        for="supplier_id"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Supplier
                      </label>
                      <div class="mt-1 relative rounded-md">
                        <div
                          v-if="isLoadingSuppliers"
                          class="flex items-center p-2"
                        >
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
                          Loading suppliers...
                        </div>
                        <select
                          v-else
                          id="supplier_id"
                          v-model="newLogistic.supplier_id"
                          class="mt-1 block w-full py-2 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary text-gray-700 dark:text-white sm:text-sm"
                          required
                        >
                          <option value="" disabled>Select a supplier</option>
                          <option
                            v-for="supplier in suppliers"
                            :key="supplier.id"
                            :value="supplier.id"
                          >
                            {{ supplier.first_name }} {{ supplier.last_name }} -
                            {{ supplier.company_name }}
                          </option>
                        </select>
                      </div>
                    </div>

                    <!-- Delivery Service -->
                    <div>
                      <label
                        for="delivery_service"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Delivery Service
                      </label>
                      <input
                        id="delivery_service"
                        v-model="newLogistic.delivery_service"
                        type="text"
                        class="mt-1 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-white p-2"
                        placeholder="Enter delivery service"
                        required
                      />
                    </div>

                    <!-- Items Section -->
                    <div>
                      <div class="flex justify-between items-center mb-2">
                        <label
                          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Items
                        </label>
                        <button
                          type="button"
                          @click="addItemRow"
                          class="flex items-center space-x-1 text-primary dark:text-dark-primary hover:text-primary-hover dark:hover:text-dark-primary-hover transition-colors"
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

                      <div
                        v-if="isLoadingItems"
                        class="flex items-center p-4 border border-gray-300 dark:border-gray-600 rounded-md"
                      >
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

                      <div
                        v-else-if="newLogistic.logistic_details.length === 0"
                        class="text-center p-4 border border-gray-300 dark:border-gray-600 border-dashed rounded-md text-gray-500 dark:text-gray-400"
                      >
                        Please add at least one item to this logistics record
                      </div>

                      <div
                        v-else
                        class="border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden"
                      >
                        <table
                          class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                        >
                          <thead class="bg-gray-50 dark:bg-gray-700">
                            <tr>
                              <th
                                scope="col"
                                class="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                              >
                                Item
                              </th>
                              <th
                                scope="col"
                                class="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                              >
                                Quantity
                              </th>
                              <th scope="col" class="w-10 px-3 py-2"></th>
                            </tr>
                          </thead>
                          <tbody
                            class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"
                          >
                            <tr
                              v-for="(
                                detail, index
                              ) in newLogistic.logistic_details"
                              :key="index"
                            >
                              <td class="px-3 py-2 whitespace-nowrap">
                                <select
                                  v-model="detail.item_id"
                                  class="block w-full py-1 px-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md text-gray-700 dark:text-white text-sm focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary"
                                  required
                                >
                                  <option value="" disabled>
                                    Select an item
                                  </option>
                                  <option
                                    v-for="item in items"
                                    :key="item.id"
                                    :value="item.id"
                                  >
                                    {{ item.name }} ({{ item.company_name }})
                                  </option>
                                </select>
                              </td>
                              <td class="px-3 py-2 whitespace-nowrap">
                                <input
                                  type="number"
                                  v-model.number="detail.quantity"
                                  min="1"
                                  class="block w-full py-1 px-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md text-gray-700 dark:text-white text-sm focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary"
                                  required
                                />
                              </td>
                              <td class="px-3 py-2 whitespace-nowrap">
                                <button
                                  type="button"
                                  @click="removeItemRow(index)"
                                  class="text-red-500 hover:text-red-700"
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
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse flex-shrink-0"
            >
              <button
                type="submit"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary dark:bg-dark-primary text-base font-medium text-white hover:bg-primary-hover dark:hover:bg-dark-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-dark-primary sm:ml-3 sm:w-auto sm:text-sm"
                :disabled="isSubmitting"
              >
                <svg
                  v-if="isSubmitting"
                  class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                {{ isSubmitting ? "Creating..." : "Create Logistics Record" }}
              </button>
              <button
                type="button"
                @click="closeCreateModal"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import apiService from "../../services/api";

const logistics = ref([]);
const totalLogistics = ref(0);
const isLoading = ref(true);
const error = ref(null);

const searchQuery = ref("");
const sortBy = ref("created_at");
const sortDirection = ref("desc");
const currentPage = ref(1);
const itemsPerPage = ref(10);
const totalPages = ref(1);

const isViewModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const isDeleting = ref(false);
const currentLogistic = ref({
  id: null,
  supplier_id: null,
  delivery_service: "",
  total_quantity: 0,
  final_price: 0,
  created_at: null,
  updated_at: null,
  supplier: {
    id: null,
    first_name: "",
    last_name: "",
    company_name: "",
  },
  logistic_details: [],
});

const isCreateModalOpen = ref(false);
const isSubmitting = ref(false);
const createErrors = ref([]);
const suppliers = ref([]);
const items = ref([]);
const isLoadingSuppliers = ref(false);
const isLoadingItems = ref(false);
const newLogistic = ref({
  supplier_id: "",
  delivery_service: "",
  logistic_details: [],
});

const isLoadingLogisticDetails = ref(false);

const fetchLogistics = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const params = {
      page: currentPage.value,
      column: sortBy.value,
      direction: sortDirection.value,
    };

    if (searchQuery.value) {
      params.search = searchQuery.value;
    }

    const response = await apiService.getLogistics(params);

    if (response.data && response.data.data) {
      logistics.value = response.data.data.data;
      totalLogistics.value = response.data.data.total;
      currentPage.value = response.data.data.current_page;
      totalPages.value = response.data.data.last_page;
    } else {
      throw new Error("Unexpected API response structure");
    }
  } catch (err) {
    console.error("Failed to fetch logistics:", err);
    error.value = "Failed to load logistics data. Please try again.";
    logistics.value = [];
    totalPages.value = 1;
    totalLogistics.value = 0;
  } finally {
    isLoading.value = false;
  }
};

const deleteLogistic = async () => {
  isDeleting.value = true;

  try {
    await apiService.deleteLogistic(currentLogistic.value.id);
    closeDeleteModal();
    fetchLogistics();
  } catch (err) {
    console.error("Failed to delete logistic:", err);
    alert(
      "Failed to delete logistic record. It may be referenced by other records."
    );
  } finally {
    isDeleting.value = false;
  }
};

const filteredLogistics = computed(() => {
  return logistics.value;
});

const paginationStart = computed(() => {
  if (logistics.value.length === 0) return 0;
  return 1 + (currentPage.value - 1) * itemsPerPage.value;
});

const paginationEnd = computed(() => {
  if (logistics.value.length === 0) return 0;
  return Math.min(
    paginationStart.value + logistics.value.length - 1,
    totalLogistics.value
  );
});

const formatCurrency = (value) => {
  if (value === null || value === undefined) return "Rp 0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

const formatNumber = (value) => {
  if (value === null || value === undefined) return "0";
  return new Intl.NumberFormat().format(value);
};

const formatDate = (date) => {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

const viewLogistic = async (logistic) => {
  currentLogistic.value = {
    id: logistic.id,
    supplier_id: logistic.supplier_id,
    delivery_service: logistic.delivery_service,
    total_quantity: logistic.total_quantity,
    final_price: logistic.final_price,
    created_at: logistic.created_at,
    updated_at: logistic.updated_at,
    supplier: logistic.supplier,
    logistic_details: []
  };
  
  isViewModalOpen.value = true;
  isLoadingLogisticDetails.value = true;
  
  try {
    const response = await apiService.getLogistic(logistic.id);
    
    if (response.data && response.data.data) {
      const logisticData = { ...response.data.data };
      
      if (logisticData.logistic_details && 
          typeof logisticData.logistic_details === 'object' && 
          logisticData.logistic_details.data) {
        logisticData.logistic_details = logisticData.logistic_details.data;
      }
      
      currentLogistic.value = logisticData;
      console.log("Logistic details loaded:", logisticData);
    } else {
      throw new Error("Unexpected API response structure");
    }
  } catch (err) {
    console.error("Failed to fetch logistic details:", err);
    alert("Failed to load logistic details. Please try again.");
    closeViewModal();
  } finally {
    isLoadingLogisticDetails.value = false;
  }
};

const editLogistic = (logistic) => {
  alert(
    "Logistics editing should be implemented in a dedicated form with item selection"
  );
};

const openCreateModal = async () => {
  isCreateModalOpen.value = true;
  newLogistic.value = {
    supplier_id: "",
    delivery_service: "",
    logistic_details: [],
  };
  createErrors.value = [];
  await Promise.all([fetchSuppliers(), fetchItems()]);
};

const confirmDelete = (logistic) => {
  currentLogistic.value = logistic;
  isDeleteModalOpen.value = true;
};

const closeViewModal = () => {
  isViewModalOpen.value = false;
};

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false;
};

const closeCreateModal = () => {
  isCreateModalOpen.value = false;
};

const addItemRow = () => {
  newLogistic.value.logistic_details.push({
    item_id: "",
    quantity: 1,
  });
};

const removeItemRow = (index) => {
  newLogistic.value.logistic_details.splice(index, 1);
};

const fetchSuppliers = async () => {
  isLoadingSuppliers.value = true;
  try {
    const response = await apiService.getUsers({ limit: 1000 });
    if (response.data && response.data.data) {
      suppliers.value = response.data.data.data.filter(
        (user) => parseInt(user.role) === 2
      );
    }
  } catch (err) {
    console.error("Failed to fetch suppliers:", err);
  } finally {
    isLoadingSuppliers.value = false;
  }
};

const fetchItems = async () => {
  isLoadingItems.value = true;
  try {
    const response = await apiService.getItems();
    if (response.data && response.data.data) {
      items.value = response.data.data.data;
    }
  } catch (err) {
    console.error("Failed to fetch items:", err);
  } finally {
    isLoadingItems.value = false;
  }
};

const submitLogistic = async () => {
  createErrors.value = [];

  if (!newLogistic.value.supplier_id) {
    createErrors.value.push("Please select a supplier");
  }

  if (!newLogistic.value.delivery_service) {
    createErrors.value.push("Delivery service is required");
  }

  if (newLogistic.value.logistic_details.length === 0) {
    createErrors.value.push("Please add at least one item");
  }

  newLogistic.value.logistic_details.forEach((detail, index) => {
    if (!detail.item_id) {
      createErrors.value.push(`Please select an item for row ${index + 1}`);
    }
    if (!detail.quantity || detail.quantity < 1) {
      createErrors.value.push(
        `Please enter a valid quantity for row ${index + 1}`
      );
    }
  });

  const itemIds = newLogistic.value.logistic_details.map(
    (detail) => detail.item_id
  );
  const hasDuplicates = itemIds.some(
    (id, index) => itemIds.indexOf(id) !== index
  );

  if (hasDuplicates) {
    createErrors.value.push("You cannot add the same item multiple times");
  }

  if (createErrors.value.length > 0) {
    return;
  }

  isSubmitting.value = true;

  try {
    await apiService.createLogistic(newLogistic.value);
    closeCreateModal();
    fetchLogistics();
  } catch (err) {
    console.error("Failed to create logistics record:", err);
    if (err.response && err.response.data && err.response.data.message) {
      createErrors.value = [err.response.data.message];
    } else {
      createErrors.value = ["An unexpected error occurred. Please try again."];
    }
  } finally {
    isSubmitting.value = false;
  }
};

watch(searchQuery, () => {
  currentPage.value = 1;
  fetchLogistics();
});

watch([sortBy, sortDirection], () => {
  fetchLogistics();
});

watch(currentPage, () => {
  fetchLogistics();
});

onMounted(() => {
  fetchLogistics();
});
</script>
