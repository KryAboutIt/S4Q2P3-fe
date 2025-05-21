<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">
        Sales
      </h1>
      <div class="flex space-x-2">
        <button
          @click="switchView('cart')"
          class="px-4 py-2 bg-primary dark:bg-dark-primary text-white rounded-md hover:bg-primary-hover dark:hover:bg-dark-primary-hover focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary"
        >
          New Transaction
        </button>
        <button
          @click="switchView('history')"
          class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400"
        >
          Sale History
        </button>
      </div>
    </div>

    <div
      v-if="currentView === 'cart'"
      class="grid grid-cols-1 lg:grid-cols-3 gap-6"
    >
      <div
        class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
      >
        <div class="p-4 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center space-x-4">
            <div class="relative flex-grow">
              <input
                v-model="searchQuery"
                type="text"
                class="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Search items..."
              />
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <svg
                  class="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div>
              <select
                v-model="categoryFilter"
                class="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary cursor-pointer"
              >
                <option value="">All Categories</option>
                <option
                  v-for="category in categories"
                  :key="category?.id"
                  :value="category?.id"
                >
                  {{ category?.name }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div
          class="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto"
        >
          <div
            v-for="item in filteredItems"
            :key="item.id"
            @click="addToCart(item)"
            class="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden shadow hover:shadow-md cursor-pointer transition-shadow duration-200"
          >
            <div
              class="h-32 w-full bg-gray-200 dark:bg-gray-600 overflow-hidden"
            >
              <img
                v-if="item.picture"
                :src="`https://pos-api.buahbibir.co.id/storage/pictures/${item.picture}`"
                :alt="item.name"
                class="h-full w-full object-cover"
              />
              <div
                v-else
                class="h-full w-full flex items-center justify-center text-gray-400 dark:text-gray-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-12 w-12"
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
            <div class="p-3">
              <h3
                class="text-sm font-medium text-gray-900 dark:text-white truncate"
              >
                {{ item.name }}
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ formatCurrency(item.sell_price) }}
              </p>
              <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                <span
                  :class="{
                    'text-green-600 dark:text-green-400': item.quantity > 10,
                    'text-yellow-600 dark:text-yellow-400':
                      item.quantity > 0 && item.quantity <= 10,
                    'text-red-600 dark:text-red-400': item.quantity === 0,
                  }"
                >
                  {{
                    item.quantity > 0
                      ? `Stock: ${item.quantity}`
                      : "Out of Stock"
                  }}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div
          class="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between"
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
                <span class="font-medium">{{ totalItems }}</span>
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
        class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden flex flex-col"
      >
        <div class="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-medium text-gray-900 dark:text-white">
            Current Order
          </h2>
        </div>
        <div class="p-4 flex-grow overflow-y-auto max-h-96">
          <div
            v-if="cart.length === 0"
            class="text-center text-gray-500 dark:text-gray-400 py-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-16 w-16 mx-auto mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <p>Cart is empty</p>
            <p class="text-sm mt-2">Add items to begin transaction</p>
          </div>
          <div v-else>
            <div
              v-for="(item, index) in cart"
              :key="`cart-${item.id}-${index}`"
              class="mb-3 p-3 border border-gray-100 dark:border-gray-700 rounded-lg shadow-sm"
            >
              <div class="flex justify-between items-center">
                <div class="flex-1">
                  <h3 class="font-medium text-gray-900 dark:text-white">
                    {{ item.name }}
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ formatCurrency(item.sell_price) }}
                  </p>
                </div>
                <div class="flex items-center">
                  <button
                    @click="decreaseQuantity(index)"
                    class="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
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
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                  <span class="w-8 text-center">{{ item.quantity }}</span>
                  <button
                    @click="increaseQuantity(index)"
                    class="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
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
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                  <button
                    @click="removeFromCart(index)"
                    class="ml-2 p-1 rounded-md text-red-400 hover:text-red-600 dark:text-red-500 dark:hover:text-red-300"
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
                </div>
              </div>
              <div
                class="mt-2 text-sm text-right text-gray-700 dark:text-gray-300"
              >
                Total: {{ formatCurrency(item.sell_price * item.quantity) }}
              </div>
            </div>
          </div>
        </div>
        <div
          class="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750"
        >
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Subtotal:</span>
              <span class="font-medium text-gray-900 dark:text-white">{{
                formatCurrency(calculateSubtotal())
              }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400"
                >Tax ({{ taxRate }}%):</span
              >
              <span class="font-medium text-gray-900 dark:text-white">{{
                formatCurrency(calculateTax())
              }}</span>
            </div>
            <div
              class="pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between"
            >
              <span class="font-medium text-gray-900 dark:text-white"
                >Total:</span
              >
              <span class="font-bold text-primary dark:text-dark-primary">{{
                formatCurrency(calculateTotal())
              }}</span>
            </div>
          </div>
          <button
            @click="proceedToCheckout"
            :disabled="cart.length === 0"
            class="w-full mt-4 px-4 py-2 bg-primary dark:bg-dark-primary text-white rounded-md hover:bg-primary-hover dark:hover:bg-dark-primary-hover focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary disabled:opacity-50"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="currentView === 'history'"
      class="bg-white dark:bg-gray-800 rounded-lg shadow"
    >
      <div
        class="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700"
      >
        <h2 class="text-lg font-medium text-gray-900 dark:text-white">
          Sales History
        </h2>
        <div class="flex items-center space-x-2">
          <div class="relative">
            <input
              v-model="historySaleSearchQuery"
              type="text"
              class="pl-8 pr-4 py-2 border rounded-md border-gray-300 dark:border-gray-600 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Search sales..."
            />
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-gray-400"
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
          </div>
          <div>
            <input
              type="date"
              v-model="dateFilter"
              class="py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </div>

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
                Customer
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Cashier
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Items
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Total
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Date
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
            <tr v-if="isLoading">
              <td
                colspan="8"
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
                  Loading sales history...
                </div>
              </td>
            </tr>

            <!-- Empty state row -->
            <tr v-else-if="salesHistory.length === 0">
              <td
                colspan="8"
                class="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
              >
                No sales found matching your criteria
              </td>
            </tr>

            <!-- Data rows -->
            <tr v-else v-for="sale in filteredSaleHistory" :key="sale.id">
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
              >
                #{{ sale.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ sale.customer_name }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">
                  {{ sale.cashier_name }}
                </div>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
              >
                {{ sale.total_quantity }} items
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ formatCurrency(sale.final_price) }}
                </div>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
              >
                {{ formatDate(sale.created_at) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="{
                    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200':
                      sale.status === 'completed',
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200':
                      sale.status === 'pending',
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200':
                      sale.status === 'cancelled',
                  }"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                >
                  {{ sale.status }}
                </span>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
              >
                <button
                  @click="viewSaleDetails(sale)"
                  class="text-primary dark:text-dark-primary hover:text-primary-hover dark:hover:text-dark-primary-hover"
                >
                  View
                </button>
              </td>
            </tr>
            <!-- <tr v-if="filteredSaleHistory.length === 0">
              <td colspan="8" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                No sales found matching your criteria
              </td>
            </tr> -->
          </tbody>
        </table>
      </div>
    </div>

    <!-- Customer Selection Modal -->
    <div
      v-if="isCustomerSelectModalOpen"
      class="fixed inset-0 z-10 overflow-y-auto"
    >
      <div
        class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div
          class="fixed inset-0 transition-opacity"
          aria-hidden="true"
          @click="closeCustomerSelectModal"
        >
          <div
            class="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"
          ></div>
        </div>

        <div
          class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3
              class="text-lg leading-6 font-medium text-gray-900 dark:text-white"
            >
              Customer Information
            </h3>

            <div class="mt-4">
              <div class="mb-4">
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >Customer Type</label
                >
                <div class="mt-2 flex space-x-4">
                  <label class="inline-flex items-center">
                    <input
                      type="radio"
                      v-model="customerType"
                      value="existing"
                      class="form-radio text-primary dark:text-dark-primary"
                    />
                    <span class="ml-2 text-gray-700 dark:text-gray-300"
                      >Existing Customer</span
                    >
                  </label>
                  <label class="inline-flex items-center">
                    <input
                      type="radio"
                      v-model="customerType"
                      value="new"
                      class="form-radio text-primary dark:text-dark-primary"
                    />
                    <span class="ml-2 text-gray-700 dark:text-gray-300"
                      >New Customer</span
                    >
                  </label>
                  <label class="inline-flex items-center">
                    <input
                      type="radio"
                      v-model="customerType"
                      value="guest"
                      class="form-radio text-primary dark:text-dark-primary"
                    />
                    <span class="ml-2 text-gray-700 dark:text-gray-300"
                      >Guest</span
                    >
                  </label>
                </div>
              </div>

              <!-- Existing Customer Selection -->
              <div v-if="customerType === 'existing'" class="space-y-4">
                <div>
                  <div class="relative">
                    <input
                      v-model="customerSearchQuery"
                      type="text"
                      class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Search customers..."
                    />
                    <div
                      class="absolute inset-y-0 left-0 pl-3 flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-gray-400"
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
                  </div>

                  <div
                    class="mt-2 max-h-48 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-md"
                  >
                    <div
                      v-for="customer in filteredCustomers"
                      :key="customer.id"
                      @click="selectCustomer(customer)"
                      class="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                      :class="{
                        'bg-gray-100 dark:bg-gray-700':
                          selectedCustomer &&
                          selectedCustomer.id === customer.id,
                      }"
                    >
                      <div
                        class="text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {{ customer.first_name }} {{ customer.last_name }}
                      </div>
                      <div class="text-xs text-gray-500 dark:text-gray-400">
                        {{ customer.phone || customer.email }}
                      </div>
                    </div>
                    <div
                      v-if="filteredCustomers.length === 0"
                      class="p-3 text-sm text-center text-gray-500 dark:text-gray-400"
                    >
                      No customers found
                    </div>
                  </div>
                </div>
              </div>

              <!-- New Customer Form -->
              <div v-if="customerType === 'new'" class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >First Name</label
                    >
                    <input
                      v-model="newCustomer.first_name"
                      type="text"
                      class="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary"
                    />
                  </div>
                  <div>
                    <label
                      class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >Last Name</label
                    >
                    <input
                      v-model="newCustomer.last_name"
                      type="text"
                      class="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary"
                    />
                  </div>
                </div>
                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >Phone</label
                  >
                  <input
                    v-model="newCustomer.phone"
                    type="text"
                    class="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary"
                  />
                </div>
                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >Email</label
                  >
                  <input
                    v-model="newCustomer.email"
                    type="email"
                    class="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary"
                  />
                </div>
              </div>

              <!-- Guest Customer -->
              <div
                v-if="customerType === 'guest'"
                class="py-4 text-center text-gray-600 dark:text-gray-400"
              >
                <p>
                  Proceeding as guest customer. No customer details will be
                  saved.
                </p>
              </div>
            </div>
          </div>
          <div
            class="bg-gray-50 dark:bg-gray-750 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
          >
            <button
              @click="confirmCustomerSelection"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary dark:bg-dark-primary text-base font-medium text-white hover:bg-primary-hover dark:hover:bg-dark-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-dark-primary sm:ml-3 sm:w-auto sm:text-sm"
            >
              Continue
            </button>
            <button
              @click="closeCustomerSelectModal"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isPaymentModalOpen" class="fixed inset-0 z-10 overflow-y-auto">
      <div
        class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div
          class="fixed inset-0 transition-opacity"
          aria-hidden="true"
          @click="closePaymentModal"
        >
          <div
            class="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"
          ></div>
        </div>

        <div
          class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3
              class="text-lg leading-6 font-medium text-gray-900 dark:text-white"
            >
              Complete Payment
            </h3>

            <div class="mt-4 space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >Customer</label
                  >
                  <p class="mt-1 text-gray-900 dark:text-white">
                    <span v-if="selectedCustomer">
                      {{ selectedCustomer.first_name }}
                      {{ selectedCustomer.last_name }}
                    </span>
                    <span v-else-if="newCustomer.first_name">
                      {{ newCustomer.first_name }} {{ newCustomer.last_name }}
                    </span>
                    <span v-else> Guest Customer </span>
                  </p>
                </div>
                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >Date</label
                  >
                  <p class="mt-1 text-gray-900 dark:text-white">
                    {{ formatDate(new Date()) }}
                  </p>
                </div>
              </div>

              <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >Order Summary</label
                >
                <div class="mt-2 space-y-1">
                  <div
                    v-for="(item, index) in cart"
                    :key="`summary-${item.id}-${index}`"
                    class="flex justify-between text-sm"
                  >
                    <span class="text-gray-600 dark:text-gray-400"
                      >{{ item.quantity }}x {{ item.name }}</span
                    >
                    <span class="text-gray-900 dark:text-white">{{
                      formatCurrency(item.sell_price * item.quantity)
                    }}</span>
                  </div>
                </div>
              </div>

              <div
                class="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2"
              >
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400"
                    >Subtotal:</span
                  >
                  <span class="text-gray-900 dark:text-white">{{
                    formatCurrency(calculateSubtotal())
                  }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400"
                    >Tax ({{ taxRate }}%):</span
                  >
                  <span class="text-gray-900 dark:text-white">{{
                    formatCurrency(calculateTax())
                  }}</span>
                </div>
                <div
                  v-if="selectedCustomer && selectedCustomer.point > 0"
                  class="pt-2"
                >
                  <div class="flex items-center">
                    <input
                      id="usePoints"
                      type="checkbox"
                      v-model="useCustomerPoints"
                      class="h-4 w-4 text-primary dark:text-dark-primary focus:ring-primary dark:focus:ring-dark-primary"
                    />
                    <label
                      for="usePoints"
                      class="ml-2 text-sm text-gray-600 dark:text-gray-400"
                    >
                      Use customer points ({{ selectedCustomer.point }} points)
                    </label>
                  </div>
                  <div
                    v-if="useCustomerPoints"
                    class="flex justify-between mt-1"
                  >
                    <span class="text-gray-600 dark:text-gray-400"
                      >Points discount:</span
                    >
                    <span class="text-red-600 dark:text-red-400"
                      >-{{ formatCurrency(calculatePointsDiscount()) }}</span
                    >
                  </div>
                </div>
                <div
                  class="pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between"
                >
                  <span class="font-medium">Total:</span>
                  <span class="font-bold text-primary dark:text-dark-primary">{{
                    formatCurrency(calculateFinalTotal())
                  }}</span>
                </div>
              </div>

              <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >Payment Method</label
                >
                <div class="mt-2 grid grid-cols-2 gap-4">
                  <div
                    v-for="method in paymentMethods"
                    :key="method.id"
                    @click="selectedPaymentMethod = method.id"
                    class="p-3 border rounded-lg cursor-pointer flex items-center space-x-2"
                    :class="
                      selectedPaymentMethod === method.id
                        ? 'border-primary dark:border-dark-primary bg-primary bg-opacity-10 dark:bg-dark-primary dark:bg-opacity-10'
                        : 'border-gray-300 dark:border-gray-600'
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-gray-600 dark:text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                      <path
                        fill-rule="evenodd"
                        d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span>{{ method.name }}</span>
                  </div>
                </div>
              </div>

              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >Amount Paid</label
                >
                <div class="mt-1 relative rounded-md shadow-sm">
                  <div
                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  >
                    <span class="text-gray-500 dark:text-gray-400 sm:text-sm"
                      >Rp</span
                    >
                  </div>
                  <input
                    type="number"
                    v-model.number="amountPaid"
                    min="0"
                    class="pl-7 pr-4 py-2 block w-full border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div
                  v-if="amountPaid >= calculateFinalTotal()"
                  class="mt-2 text-right text-green-600 dark:text-green-400"
                >
                  Change:
                  {{ formatCurrency(amountPaid - calculateFinalTotal()) }}
                </div>
                <div
                  v-else-if="amountPaid > 0"
                  class="mt-2 text-right text-red-600 dark:text-red-400"
                >
                  Remaining:
                  {{ formatCurrency(calculateFinalTotal() - amountPaid) }}
                </div>
              </div>
            </div>
          </div>
          <div
            class="bg-gray-50 dark:bg-gray-750 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
          >
            <button
              @click="completeTransaction"
              :disabled="
                !selectedPaymentMethod || amountPaid < calculateFinalTotal()
              "
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary dark:bg-dark-primary text-base font-medium text-white hover:bg-primary-hover dark:hover:bg-dark-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-dark-primary sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
            >
              Complete Sale
            </button>
            <button
              @click="closePaymentModal"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="isSaleDetailsModalOpen"
      class="fixed inset-0 z-10 overflow-y-auto"
    >
      <div
        class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div
          class="fixed inset-0 transition-opacity"
          aria-hidden="true"
          @click="closeSaleDetailsModal"
        >
          <div
            class="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"
          ></div>
        </div>

        <div
          class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3
              class="text-lg leading-6 font-medium text-gray-900 dark:text-white"
            >
              Sale Details
            </h3>

            <div v-if="selectedSale" class="mt-4 space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >Sale ID</label
                  >
                  <p class="mt-1 text-gray-900 dark:text-white">
                    #{{ selectedSale.id }}
                  </p>
                </div>
                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >Date</label
                  >
                  <p class="mt-1 text-gray-900 dark:text-white">
                    {{ formatDate(selectedSale.created_at) }}
                  </p>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >Customer</label
                  >
                  <p class="mt-1 text-gray-900 dark:text-white">
                    {{ selectedSale.customer_name }}
                  </p>
                </div>
                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >Cashier</label
                  >
                  <p class="mt-1 text-gray-900 dark:text-white">
                    {{ selectedSale.cashier_name }}
                  </p>
                </div>
              </div>

              <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h4 class="font-medium text-gray-900 dark:text-white">Items</h4>
                <div class="mt-2 space-y-2">
                  <div
                    v-for="item in selectedSale.items"
                    :key="item.id"
                    class="flex justify-between items-center"
                  >
                    <div>
                      <p class="text-gray-900 dark:text-white">
                        {{ item.name }}
                      </p>
                      <p class="text-sm text-gray-500 dark:text-gray-400">
                        {{ item.quantity }} x
                        {{ formatCurrency(item.sell_price) }}
                      </p>
                    </div>
                    <p class="text-gray-900 dark:text-white">
                      {{ formatCurrency(item.quantity * item.sell_price) }}
                    </p>
                  </div>
                </div>
              </div>

              <div
                class="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2"
              >
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400"
                    >Subtotal:</span
                  >
                  <span class="text-gray-900 dark:text-white">{{
                    formatCurrency(selectedSale.subtotal)
                  }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Tax:</span>
                  <span class="text-gray-900 dark:text-white">{{
                    formatCurrency(selectedSale.tax)
                  }}</span>
                </div>
                <div
                  v-if="selectedSale.points_used"
                  class="flex justify-between"
                >
                  <span class="text-gray-600 dark:text-gray-400"
                    >Points discount:</span
                  >
                  <span class="text-red-600 dark:text-red-400"
                    >-{{ formatCurrency(selectedSale.points_discount) }}</span
                  >
                </div>
                <div
                  class="pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between"
                >
                  <span class="font-medium">Total:</span>
                  <span class="font-bold text-primary dark:text-dark-primary">{{
                    formatCurrency(selectedSale.final_price)
                  }}</span>
                </div>
              </div>

              <div
                class="border-t border-gray-200 dark:border-gray-700 pt-4 grid grid-cols-2 gap-4"
              >
                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >Payment Method</label
                  >
                  <p class="mt-1 text-gray-900 dark:text-white">
                    {{ selectedSale.payment_method }}
                  </p>
                </div>
                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >Status</label
                  >
                  <p class="mt-1">
                    <span
                      :class="{
                        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200':
                          selectedSale.status === 'completed',
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200':
                          selectedSale.status === 'pending',
                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200':
                          selectedSale.status === 'cancelled',
                      }"
                      class="px-2 py-1 text-xs rounded-full"
                    >
                      {{ selectedSale.status }}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 dark:bg-gray-750 px-4 py-3 sm:px-6">
            <button
              @click="printReceipt"
              class="mr-3 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary dark:bg-dark-primary text-base font-medium text-white hover:bg-primary-hover dark:hover:bg-dark-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-dark-primary sm:w-auto sm:text-sm"
            >
              Print Receipt
            </button>
            <button
              @click="closeSaleDetailsModal"
              class="inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-400 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive, watch } from "vue";
import apiService from "../../services/api";

const getUser = () => {
  const userJson = localStorage.getItem("user");
  return userJson ? JSON.parse(userJson) : null;
};

const currentView = ref("cart");

const items = ref([]);
const categories = ref([]);
const searchQuery = ref("");
const categoryFilter = ref("");
const isLoading = ref(false);

const currentPage = ref(1);
const perPage = ref(15);
const totalItems = ref(0);
const totalPages = computed(
  () => Math.ceil(totalItems.value / perPage.value) || 1
);
const paginationStart = computed(
  () => (currentPage.value - 1) * perPage.value + 1
);
const paginationEnd = computed(() =>
  Math.min(currentPage.value * perPage.value, totalItems.value)
);

const historySaleSearchQuery = ref("");
const dateFilter = ref("");
const sortBy = ref("created_at");
const sortDirection = ref("desc");

const cart = ref([]);
const taxRate = ref(10);

const isCustomerSelectModalOpen = ref(false);
const customerType = ref("existing");
const customers = ref([]);
const customerSearchQuery = ref("");
const selectedCustomer = ref(null);
const newCustomer = reactive({
  first_name: "",
  last_name: "",
  phone: "",
  email: "",
  role: "customer",
  point: 0,
});

const isPaymentModalOpen = ref(false);
const paymentMethods = ref([]);
const selectedPaymentMethod = ref(null);
const amountPaid = ref(0);
const useCustomerPoints = ref(false);

const salesHistory = ref([]);
const isSaleDetailsModalOpen = ref(false);
const selectedSale = ref(null);

const saleStatusMap = {
  0: "pending",
  1: "completed",
  2: "cancelled",
};

const filteredItems = computed(() => {
  return items.value.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    const matchesCategory =
      !categoryFilter.value || item.category_id == categoryFilter.value;
    return matchesSearch && matchesCategory;
  });
});

const filteredCustomers = computed(() => {
  if (!customerSearchQuery.value) return customers.value;

  return customers.value.filter((customer) => {
    const fullName =
      `${customer.first_name} ${customer.last_name}`.toLowerCase();
    const email = customer.email ? customer.email.toLowerCase() : "";
    const phone = customer.phone ? customer.phone.toLowerCase() : "";

    return (
      fullName.includes(customerSearchQuery.value.toLowerCase()) ||
      email.includes(customerSearchQuery.value.toLowerCase()) ||
      phone.includes(customerSearchQuery.value.toLowerCase())
    );
  });
});

const filteredSaleHistory = computed(() => {
  return salesHistory.value;
});

const showEmptySalesState = computed(() => {
  return !isLoading.value && filteredSaleHistory.value.length === 0;
});

const switchView = (view) => {
  currentView.value = view;

  if (view === "history") {
    fetchSaleHistory();
    fetchPaymentMethods();
  } else if (view === "cart") {
    fetchItems();
    fetchCategories();
  }
};

const fetchItems = async () => {
  try {
    isLoading.value = true;
    const response = await apiService.getItems({
      page: currentPage.value,
      per_page: perPage.value,
    });

    items.value = response.data.data.data;
    totalItems.value = response.data.data.total;
  } catch (error) {
    console.error("Error fetching items:", error);
    alert("Failed to load items. Please try again.");
  } finally {
    isLoading.value = false;
  }
};

const fetchCategories = async () => {
  try {
    const response = await apiService.getCategories();
    categories.value = response.data.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    alert("Failed to load categories");
  }
};

const fetchCustomers = async () => {
  try {
    const response = await apiService.getCustomers();
    customers.value = response.data.data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    alert("Failed to load customers");
  }
};

const fetchPaymentMethods = async () => {
  try {
    const response = await apiService.getPaymentMethods();
    paymentMethods.value = response.data.data;
  } catch (error) {
    console.error("Error fetching payment methods:", error);
    alert("Failed to load payment methods");
  }
};

const fetchSaleHistory = async () => {
  try {
    isLoading.value = true;

    const params = {
      limit: perPage.value,
      page: currentPage.value,
      column: sortBy.value,
      direction: sortDirection.value,
    };

    if (historySaleSearchQuery.value) {
      params.search = historySaleSearchQuery.value;
    }

    if (dateFilter.value) {
      params.date = dateFilter.value;
    }

    const response = await apiService.getSales(params);

    salesHistory.value = response.data.data.data.map((sale) => ({
      ...sale,
      status: saleStatusMap[sale.status] || "unknown",
      customer_name: sale.customer
        ? `${sale.customer.first_name} ${sale.customer.last_name}`
        : "Guest",
      cashier_name: sale.cashier
        ? `${sale.cashier.first_name} ${sale.cashier.last_name}`
        : "Unknown",
      payment_method: sale.payment?.name || "Unknown",
      total_quantity: sale.total_quantity,
      subtotal: sale.final_price - sale.admin_fee,
      tax: sale.admin_fee,
      points_used: sale.point_used,
      points_discount: sale.bill ? sale.final_price - sale.bill : 0,
      final_price: sale.bill || sale.final_price,
    }));

    totalItems.value = response.data.data.total;
    currentPage.value = response.data.data.current_page;
  } catch (error) {
    console.error("Error fetching sales history:", error);
    alert("Failed to load sales history");
  } finally {
    isLoading.value = false;
  }
};

const toggleSort = (column) => {
  if (sortBy.value === column) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortBy.value = column;
    sortDirection.value = "asc";
  }
  fetchSaleHistory();
};

const addToCart = (item) => {
  if (item.quantity <= 0) {
    alert("This item is out of stock");
    return;
  }

  const existingItem = cart.value.find((cartItem) => cartItem.id === item.id);

  if (existingItem) {
    if (existingItem.quantity < item.quantity) {
      existingItem.quantity++;
    } else {
      alert("Cannot add more than available stock");
    }
  } else {
    const itemToAdd = { ...item, quantity: 1 };
    cart.value.push(itemToAdd);
  }
};

const removeFromCart = (index) => {
  cart.value.splice(index, 1);
};

const increaseQuantity = (index) => {
  const item = cart.value[index];
  const originalItem = items.value.find((i) => i.id === item.id);

  if (originalItem && item.quantity < originalItem.quantity) {
    item.quantity++;
  } else {
    alert("Cannot add more than available stock");
  }
};

const decreaseQuantity = (index) => {
  const item = cart.value[index];
  if (item.quantity > 1) {
    item.quantity--;
  } else {
    removeFromCart(index);
  }
};

const calculateSubtotal = () => {
  return cart.value.reduce(
    (total, item) => total + item.sell_price * item.quantity,
    0
  );
};

const calculateTax = () => {
  return (calculateSubtotal() * taxRate.value) / 100;
};

const calculateTotal = () => {
  return calculateSubtotal() + calculateTax();
};

const calculatePointsDiscount = () => {
  if (!selectedCustomer.value || !useCustomerPoints.value) return 0;
  return Math.min(selectedCustomer.value.point * 100, calculateTotal() * 0.2);
};

const calculateFinalTotal = () => {
  return calculateTotal() - calculatePointsDiscount();
};

const proceedToCheckout = () => {
  if (cart.value.length === 0) {
    alert("Your cart is empty");
    return;
  }

  isCustomerSelectModalOpen.value = true;

  fetchCustomers();
  fetchPaymentMethods();
};

const closeCustomerSelectModal = () => {
  isCustomerSelectModalOpen.value = false;
  customerType.value = "existing";
  customerSearchQuery.value = "";
  selectedCustomer.value = null;
  Object.assign(newCustomer, {
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
  });
};

const selectCustomer = (customer) => {
  selectedCustomer.value = customer;
};

const confirmCustomerSelection = async () => {
  if (customerType.value === "existing" && !selectedCustomer.value) {
    alert("Please select a customer");
    return;
  }

  if (customerType.value === "new") {
    if (!newCustomer.first_name || !newCustomer.last_name) {
      alert("Please fill in customer name");
      return;
    }

    try {
      const response = await apiService.createCustomer({
        ...newCustomer,
        role: "customer",
      });

      selectedCustomer.value = response.data.data;
      alert("New customer created");
    } catch (error) {
      console.error("Error creating customer:", error);
      alert("Failed to create customer");
      return;
    }
  }

  isCustomerSelectModalOpen.value = false;

  isPaymentModalOpen.value = true;
  selectedPaymentMethod.value =
    paymentMethods.value.length > 0 ? paymentMethods.value[0].id : null;
  amountPaid.value = calculateFinalTotal();
};

const closePaymentModal = () => {
  isPaymentModalOpen.value = false;
  selectedPaymentMethod.value = null;
  amountPaid.value = 0;
  useCustomerPoints.value = false;
};

const completeTransaction = async () => {
  if (!selectedPaymentMethod.value) {
    alert("Please select a payment method");
    return;
  }

  if (amountPaid.value < calculateFinalTotal()) {
    alert("Amount paid is insufficient");
    return;
  }

  try {
    const paymentMethod = paymentMethods.value.find(
      (m) => m.id === selectedPaymentMethod.value
    );
    const pointsUsed =
      useCustomerPoints.value && selectedCustomer.value
        ? selectedCustomer.value.point
        : 0;
    const pointsDiscount = calculatePointsDiscount();
    const finalPrice = calculateFinalTotal();

    const currentUser = getUser();

    const saleData = {
      customer_id: selectedCustomer.value ? selectedCustomer.value.id : null,
      payment_id: paymentMethod.id,
      status: 1,
      total_quantity: cart.value.reduce(
        (total, item) => total + item.quantity,
        0
      ),
      final_price: finalPrice + paymentMethod.admin_fee,
      admin_fee: paymentMethod.admin_fee,
      point_used: pointsUsed,
      bill: finalPrice,
      paid: amountPaid.value,
      change: amountPaid.value - finalPrice,
      items: cart.value.map((item) => ({
        item_id: item.id,
        quantity: item.quantity,
        price: item.sell_price,
      })),
    };

    const response = await apiService.createSale(saleData);

    alert("Transaction completed successfully");

    if (useCustomerPoints.value && selectedCustomer.value) {
      try {
        await apiService.updateCustomer(selectedCustomer.value.id, {
          point: 0,
        });
      } catch (error) {
        console.error("Error updating customer points:", error);
      }
    }

    if (selectedCustomer.value) {
      const pointsToAdd = Math.floor(finalPrice / 10000);
      if (pointsToAdd > 0) {
        try {
          await apiService.updateCustomer(selectedCustomer.value.id, {
            point: pointsToAdd,
          });
        } catch (error) {
          console.error("Error adding points to customer:", error);
        }
      }
    }

    const processedSale = {
      ...response.data.data,
      status: saleStatusMap[response.data.data.status] || "completed",
      customer_name: selectedCustomer.value
        ? `${selectedCustomer.value.first_name} ${selectedCustomer.value.last_name}`
        : newCustomer.first_name
        ? `${newCustomer.first_name} ${newCustomer.last_name}`
        : "Guest",
      cashier_name: currentUser
        ? `${currentUser.first_name} ${currentUser.last_name}`
        : "Cashier",
      payment_method: paymentMethod.name,
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      points_used: pointsUsed,
      points_discount: pointsDiscount,
      final_price: finalPrice,
      items: cart.value.map((item) => ({
        ...item,
        sell_price: item.sell_price,
      })),
    };

    selectedSale.value = processedSale;
    isSaleDetailsModalOpen.value = true;

    cart.value = [];
    closePaymentModal();

    fetchItems();
  } catch (error) {
    console.error("Error completing transaction:", error);
    alert("Failed to complete transaction");
  }
};

const viewSaleDetails = async (sale) => {
  try {
    const response = await apiService.getSale(sale.id);

    const detailedSale = {
      ...sale,
      items: response.data.data.items || [],
    };

    selectedSale.value = detailedSale;
    isSaleDetailsModalOpen.value = true;
  } catch (error) {
    console.error("Error fetching sale details:", error);
    alert("Failed to load sale details");
  }
};

const closeSaleDetailsModal = () => {
  isSaleDetailsModalOpen.value = false;
  selectedSale.value = null;
};

const printReceipt = () => {
  if (!selectedSale.value) return;

  const receiptWindow = window.open("", "_blank", "width=400,height=600");

  if (receiptWindow) {
    const storeInfo = `
      <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="margin: 0;">POS System</h2>
        <p style="margin: 5px 0;">123 Main Street</p>
        <p style="margin: 5px 0;">City, Country</p>
        <p style="margin: 5px 0;">Tel: (123) 456-7890</p>
      </div>
    `;

    const saleInfo = `
      <div style="margin-bottom: 15px; border-bottom: 1px dashed #000; padding-bottom: 10px;">
        <p>Receipt #: ${selectedSale.value.id}</p>
        <p>Date: ${formatDate(selectedSale.value.created_at)}</p>
        <p>Cashier: ${selectedSale.value.cashier_name}</p>
        <p>Customer: ${selectedSale.value.customer_name}</p>
      </div>
    `;

    let itemsList = `
      <div style="margin-bottom: 15px;">
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th style="text-align: left;">Item</th>
              <th style="text-align: right;">Qty</th>
              <th style="text-align: right;">Price</th>
              <th style="text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
    `;

    selectedSale.value.items.forEach((item) => {
      itemsList += `
        <tr>
          <td style="text-align: left;">${item.name}</td>
          <td style="text-align: right;">${item.quantity}</td>
          <td style="text-align: right;">${formatCurrency(
            item.sell_price || item.price
          )}</td>
          <td style="text-align: right;">${formatCurrency(
            (item.sell_price || item.price) * item.quantity
          )}</td>
        </tr>
      `;
    });

    itemsList += `
          </tbody>
        </table>
      </div>
    `;

    const summary = `
      <div style="margin-top: 15px; border-top: 1px dashed #000; padding-top: 10px;">
        <table style="width: 100%;">
          <tr>
            <td style="text-align: right;">Subtotal:</td>
            <td style="text-align: right;">${formatCurrency(
              selectedSale.value.subtotal
            )}</td>
          </tr>
          <tr>
            <td style="text-align: right;">Admin Fee/Tax:</td>
            <td style="text-align: right;">${formatCurrency(
              selectedSale.value.tax || selectedSale.value.admin_fee
            )}</td>
          </tr>
          ${
            selectedSale.value.points_used
              ? `
          <tr>
            <td style="text-align: right;">Points Discount:</td>
            <td style="text-align: right;">-${formatCurrency(
              selectedSale.value.points_discount
            )}</td>
          </tr>`
              : ""
          }
          <tr>
            <td style="text-align: right; font-weight: bold;">Total:</td>
            <td style="text-align: right; font-weight: bold;">${formatCurrency(
              selectedSale.value.bill || selectedSale.value.final_price
            )}</td>
          </tr>
          <tr>
            <td style="text-align: right;">Amount Paid:</td>
            <td style="text-align: right;">${formatCurrency(
              selectedSale.value.paid
            )}</td>
          </tr>
          <tr>
            <td style="text-align: right;">Change:</td>
            <td style="text-align: right;">${formatCurrency(
              selectedSale.value.change
            )}</td>
          </tr>
          <tr>
            <td style="text-align: right;">Payment Method:</td>
            <td style="text-align: right;">${
              selectedSale.value.payment_method
            }</td>
          </tr>
        </table>
      </div>
    `;

    const footer = `
      <div style="margin-top: 30px; text-align: center;">
        <p>Thank you for your purchase!</p>
      </div>
    `;

    receiptWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Receipt #${selectedSale.value.id}</title>
          <style>
            body { font-family: monospace; font-size: 12px; padding: 20px; }
          </style>
        </head>
        <body>
          ${storeInfo}
          ${saleInfo}
          ${itemsList}
          ${summary}
          ${footer}
        </body>
      </html>
    `);

    receiptWindow.document.close();
    setTimeout(() => {
      receiptWindow.print();
    }, 500);
  } else {
    alert("Unable to open print window. Please check your pop-up settings.");
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
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Date error";
  }
};

const formatDateForComparison = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

watch(
  [historySaleSearchQuery, dateFilter, sortBy, sortDirection],
  () => {
    if (currentView.value === "history") {
      currentPage.value = 1;
      fetchSaleHistory();
    }
  },
  { immediate: false }
);

onMounted(() => {
  fetchItems();
  fetchCategories();
  fetchPaymentMethods();
});
</script>
