<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-800 dark:text-white">
        System Configuration
      </h1>
    </div>

    <div class="flex flex-col lg:flex-row gap-6">
      <div class="lg:w-1/4">
        <div
          class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
        >
          <div class="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 class="font-medium text-gray-900 dark:text-white">Settings</h2>
          </div>
          <div>
            <button
              @click="activeTab = 'categories'"
              class="w-full px-4 py-3 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
              :class="{
                'bg-gray-100 dark:bg-gray-700 border-l-4 border-primary dark:border-dark-primary':
                  activeTab === 'categories',
                'text-gray-700 dark:text-gray-300': activeTab !== 'categories',
                'font-medium text-primary dark:text-dark-primary':
                  activeTab === 'categories',
              }"
            >
              Categories Management
            </button>
            <button
              @click="activeTab = 'payment-methods'"
              class="w-full px-4 py-3 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
              :class="{
                'bg-gray-100 dark:bg-gray-700 border-l-4 border-primary dark:border-dark-primary':
                  activeTab === 'payment-methods',
                'text-gray-700 dark:text-gray-300':
                  activeTab !== 'payment-methods',
                'font-medium text-primary dark:text-dark-primary':
                  activeTab === 'payment-methods',
              }"
            >
              Payment Methods
            </button>
          </div>
        </div>
      </div>

      <div class="lg:w-3/4">
        <div v-if="activeTab === 'categories'" class="space-y-6">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div
              class="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700"
            >
              <h2 class="text-lg font-medium text-gray-900 dark:text-white">
                Categories Management
              </h2>
              <button
                @click="openCreateCategoryModal"
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
                <span>Add Category</span>
              </button>
            </div>

            <div class="p-4">
              <div class="relative mb-4">
                <input
                  type="text"
                  v-model="categorySearchQuery"
                  placeholder="Search categories..."
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

              <div class="overflow-x-auto">
                <table
                  class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                >
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
                        Name
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Created Date
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
                    <tr v-if="isLoadingCategories">
                      <td
                        colspan="4"
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
                          Loading categories...
                        </div>
                      </td>
                    </tr>

                    <tr v-else-if="categories.length === 0">
                      <td
                        colspan="4"
                        class="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                      >
                        No categories found matching your criteria
                      </td>
                    </tr>

                    <tr
                      v-else
                      v-for="category in filteredCategories"
                      :key="category.id"
                      class="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td
                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                      >
                        #{{ category.id }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div
                          class="text-sm font-medium text-gray-900 dark:text-white"
                        >
                          {{ category.name }}
                        </div>
                      </td>
                      <td
                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                      >
                        {{ formatDate(category.created_at) }}
                      </td>
                      <td
                        class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2"
                      >
                        <button
                          @click="editCategory(category)"
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
                          @click="confirmDeleteCategory(category)"
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
                class="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6 mt-4"
              >
                <div
                  class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
                >
                  <div>
                    <p class="text-sm text-gray-700 dark:text-gray-400">
                      Showing
                      <span class="font-medium">{{
                        categoryPaginationStart
                      }}</span>
                      to
                      <span class="font-medium">{{
                        categoryPaginationEnd
                      }}</span>
                      of
                      <span class="font-medium">{{ totalCategories }}</span>
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
                            categoryCurrentPage = Math.max(
                              1,
                              categoryCurrentPage - 1
                            );
                            fetchCategories();
                          }
                        "
                        :disabled="categoryCurrentPage === 1"
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
                      <template v-for="page in categoryTotalPages" :key="page">
                        <button
                          v-if="
                            page === categoryCurrentPage ||
                            page === 1 ||
                            page === categoryTotalPages ||
                            (page >= categoryCurrentPage - 1 &&
                              page <= categoryCurrentPage + 1)
                          "
                          @click="
                            () => {
                              categoryCurrentPage = page;
                              fetchCategories();
                            }
                          "
                          :class="[
                            'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                            categoryCurrentPage === page
                              ? 'z-10 bg-primary dark:bg-dark-primary border-primary dark:border-dark-primary text-white'
                              : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600',
                          ]"
                        >
                          {{ page }}
                        </button>
                        <span
                          v-else-if="
                            page === categoryCurrentPage - 2 ||
                            page === categoryCurrentPage + 2
                          "
                          class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-400"
                        >
                          ...
                        </span>
                      </template>
                      <button
                        @click="
                          () => {
                            categoryCurrentPage = Math.min(
                              categoryTotalPages,
                              categoryCurrentPage + 1
                            );
                            fetchCategories();
                          }
                        "
                        :disabled="categoryCurrentPage === categoryTotalPages"
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
          </div>
        </div>

        <div v-if="activeTab === 'payment-methods'" class="space-y-6">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div
              class="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700"
            >
              <h2 class="text-lg font-medium text-gray-900 dark:text-white">
                Payment Methods
              </h2>
              <button
                @click="openCreatePaymentModal"
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
                <span>Add Payment Method</span>
              </button>
            </div>

            <div class="p-4">
              <div class="overflow-x-auto">
                <table
                  class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                >
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
                        Name
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Admin Fee
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
                    <tr v-if="isLoadingPayments">
                      <td
                        colspan="4"
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
                          Loading payment methods...
                        </div>
                      </td>
                    </tr>

                    <tr v-else-if="paymentMethods.length === 0">
                      <td
                        colspan="4"
                        class="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                      >
                        No payment methods found
                      </td>
                    </tr>

                    <tr
                      v-else
                      v-for="method in paymentMethods"
                      :key="method.id"
                      class="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td
                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                      >
                        #{{ method.id }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div
                          class="text-sm font-medium text-gray-900 dark:text-white"
                        >
                          {{ method.name }}
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900 dark:text-white">
                          {{ formatCurrency(method.admin_fee) }}
                        </div>
                      </td>
                      <td
                        class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2"
                      >
                        <button
                          @click="editPaymentMethod(method)"
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
                          @click="confirmDeletePaymentMethod(method)"
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
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="isCategoryModalOpen"
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
          @click="closeCategoryModal"
        ></div>

        <div
          class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <form @submit.prevent="saveCategory">
            <div
              class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
            >
              <div class="sm:flex sm:items-start">
                <div class="w-full mt-3 text-center sm:mt-0 sm:text-left">
                  <h3
                    class="text-lg leading-6 font-medium text-gray-900 dark:text-white"
                    id="modal-title"
                  >
                    {{
                      isEditingCategory ? "Edit Category" : "Add New Category"
                    }}
                  </h3>
                  <div class="mt-4">
                    <label
                      for="name"
                      class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >Name</label
                    >
                    <input
                      id="name"
                      v-model="currentCategory.name"
                      type="text"
                      class="mt-1 px-3 py-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
                    />
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
                :disabled="isSavingCategory"
              >
                <svg
                  v-if="isSavingCategory"
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
                {{
                  isEditingCategory
                    ? isSavingCategory
                      ? "Saving..."
                      : "Save Changes"
                    : isSavingCategory
                    ? "Creating..."
                    : "Create Category"
                }}
              </button>
              <button
                type="button"
                @click="closeCategoryModal"
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
      v-if="isPaymentModalOpen"
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
          @click="closePaymentModal"
        ></div>

        <div
          class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <form @submit.prevent="savePaymentMethod">
            <div
              class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
            >
              <div class="sm:flex sm:items-start">
                <div class="w-full mt-3 text-center sm:mt-0 sm:text-left">
                  <h3
                    class="text-lg leading-6 font-medium text-gray-900 dark:text-white"
                    id="modal-title"
                  >
                    {{
                      isEditingPayment
                        ? "Edit Payment Method"
                        : "Add New Payment Method"
                    }}
                  </h3>
                  <div class="mt-4 space-y-4">
                    <div>
                      <label
                        for="payment-name"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Name</label
                      >
                      <input
                        id="payment-name"
                        v-model="currentPayment.name"
                        type="text"
                        class="mt-1 px-3 py-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label
                        for="admin-fee"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Admin Fee</label
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
                          id="admin-fee"
                          v-model="currentPayment.admin_fee"
                          type="number"
                          min="0"
                          class="pl-8 pr-3 py-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
                        />
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
                :disabled="isSavingPaymentMethod"
              >
                <svg
                  v-if="isSavingPaymentMethod"
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
                {{
                  isEditingPayment
                    ? isSavingPaymentMethod
                      ? "Saving..."
                      : "Save Changes"
                    : isSavingPaymentMethod
                    ? "Creating..."
                    : "Create Payment Method"
                }}
              </button>
              <button
                type="button"
                @click="closePaymentModal"
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
                  Delete
                  {{
                    deleteType === "category" ? "Category" : "Payment Method"
                  }}
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this {{ deleteType }}? This
                    action cannot be undone.
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
              @click="confirmDelete"
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import apiService from "../../services/api";

const activeTab = ref("categories");

const categories = ref([]);
const categorySearchQuery = ref("");
const isLoadingCategories = ref(false);
const totalCategories = ref(0);
const categoryCurrentPage = ref(1);
const categoryPerPage = ref(10);
const isCategoryModalOpen = ref(false);
const isEditingCategory = ref(false);
const currentCategory = ref({
  id: null,
  name: "",
});

const paymentMethods = ref([]);
const isLoadingPayments = ref(false);
const isPaymentModalOpen = ref(false);
const isEditingPayment = ref(false);
const currentPayment = ref({
  id: null,
  name: "",
  admin_fee: 0,
});

const isDeleteModalOpen = ref(false);
const deleteType = ref("");
const itemToDelete = ref(null);

const isSavingCategory = ref(false);
const isSavingPaymentMethod = ref(false);
const isDeleting = ref(false);

const filteredCategories = computed(() => {
  if (!categorySearchQuery.value) return categories.value;

  return categories.value.filter((category) =>
    category.name
      .toLowerCase()
      .includes(categorySearchQuery.value.toLowerCase())
  );
});

const categoryTotalPages = computed(() => {
  return Math.ceil(totalCategories.value / categoryPerPage.value) || 1;
});

const categoryPaginationStart = computed(() => {
  return (categoryCurrentPage.value - 1) * categoryPerPage.value + 1;
});

const categoryPaginationEnd = computed(() => {
  return Math.min(
    categoryCurrentPage.value * categoryPerPage.value,
    totalCategories.value
  );
});

const fetchCategories = async () => {
  isLoadingCategories.value = true;
  try {
    const response = await apiService.getCategories({
      limit: categoryPerPage.value,
      page: categoryCurrentPage.value,
      column: "id",
      direction: "desc",
      search: categorySearchQuery.value || undefined,
    });

    categories.value = response.data.data.data;
    totalCategories.value = response.data.data.total;
    categoryCurrentPage.value = response.data.data.current_page;
  } catch (error) {
    console.error("Error fetching categories:", error);
  } finally {
    isLoadingCategories.value = false;
  }
};

const fetchPaymentMethods = async () => {
  isLoadingPayments.value = true;
  try {
    const response = await apiService.getPaymentMethods();

    if (response && response.data && response.data.data) {
      if (response.data.data.data && Array.isArray(response.data.data.data)) {
        paymentMethods.value = response.data.data.data;
      } else if (Array.isArray(response.data.data)) {
        paymentMethods.value = response.data.data;
      } else {
        console.warn(
          "Unexpected response structure, falling back to empty array"
        );
        paymentMethods.value = [];
      }
    } else {
      console.warn(
        "Response missing data property, falling back to empty array"
      );
      paymentMethods.value = [];
    }
  } catch (error) {
    console.error("Error fetching payment methods:", error);
    paymentMethods.value = [];
  } finally {
    isLoadingPayments.value = false;
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

const openCreateCategoryModal = () => {
  isEditingCategory.value = false;
  currentCategory.value = { id: null, name: "" };
  isCategoryModalOpen.value = true;
};

const editCategory = (category) => {
  isEditingCategory.value = true;
  currentCategory.value = { ...category };
  isCategoryModalOpen.value = true;
};

const closeCategoryModal = () => {
  isCategoryModalOpen.value = false;
};

const saveCategory = async () => {
  try {
    if (!currentCategory.value.name.trim()) {
      alert("Category name is required");
      return;
    }

    isSavingCategory.value = true;

    if (isEditingCategory.value) {
      await apiService.updateCategory(
        currentCategory.value.id,
        currentCategory.value
      );
    } else {
      await apiService.createCategory(currentCategory.value);
    }

    closeCategoryModal();
    fetchCategories();
  } catch (error) {
    console.error("Error saving category:", error);
    alert("Failed to save category. Please try again.");
  } finally {
    isSavingCategory.value = false;
  }
};

const confirmDeleteCategory = (category) => {
  deleteType.value = "category";
  itemToDelete.value = category;
  isDeleteModalOpen.value = true;
};

const openCreatePaymentModal = () => {
  isEditingPayment.value = false;
  currentPayment.value = { id: null, name: "", admin_fee: 0 };
  isPaymentModalOpen.value = true;
};

const editPaymentMethod = (method) => {
  isEditingPayment.value = true;
  currentPayment.value = {
    ...method,
    admin_fee: method.admin_fee * 1000,
  };
  isPaymentModalOpen.value = true;
};

const closePaymentModal = () => {
  isPaymentModalOpen.value = false;
};

const savePaymentMethod = async () => {
  try {
    if (!currentPayment.value.name.trim()) {
      alert("Payment method name is required");
      return;
    }

    isSavingPaymentMethod.value = true;

    const paymentData = {
      ...currentPayment.value,
      admin_fee: parseFloat((currentPayment.value.admin_fee / 1000).toFixed(2)),
    };

    if (isEditingPayment.value) {
      await apiService.updatePaymentMethod(paymentData.id, paymentData);
    } else {
      await apiService.createPaymentMethod(paymentData);
    }

    closePaymentModal();
    fetchPaymentMethods();
  } catch (error) {
    console.error("Error saving payment method:", error);
    alert("Failed to save payment method. Please try again.");
  } finally {
    isSavingPaymentMethod.value = false;
  }
};

const confirmDeletePaymentMethod = (method) => {
  deleteType.value = "payment method";
  itemToDelete.value = method;
  isDeleteModalOpen.value = true;
};

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false;
  itemToDelete.value = null;
};

const confirmDelete = async () => {
  try {
    isDeleting.value = true;

    if (deleteType.value === "category") {
      await apiService.deleteCategory(itemToDelete.value.id);
      fetchCategories();
    } else if (deleteType.value === "payment method") {
      await apiService.deletePaymentMethod(itemToDelete.value.id);
      fetchPaymentMethods();
    }
    closeDeleteModal();
  } catch (error) {
    console.error(`Error deleting ${deleteType.value}:`, error);
    alert(
      `Failed to delete ${deleteType.value}. It may be in use by other items.`
    );
  } finally {
    isDeleting.value = false;
  }
};

watch(categorySearchQuery, () => {
  categoryCurrentPage.value = 1;
  fetchCategories();
});

watch(activeTab, (newTab) => {
  if (newTab === "categories") {
    fetchCategories();
  } else if (newTab === "payment-methods") {
    fetchPaymentMethods();
  }
});

onMounted(() => {
  fetchCategories();
  fetchPaymentMethods();
});
</script>
