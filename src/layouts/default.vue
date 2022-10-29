<template>
  <div
    m-0 p-0
    h-screen
    flex flex-col
  >
    <Header />
    <main
      m-a p-4
      flex flex-col flex-1
      text-gray-700 dark:text-gray-200
    >
      <RouterView />
    </main>
    <Footer />
  </div>
</template>
