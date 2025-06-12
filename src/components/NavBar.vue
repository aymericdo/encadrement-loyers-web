<template>
  <header>
    <div class="wrapper">
      <nav class="fixed inset-x-0 top-0 z-50 shadow dark:bg-gray-950 bg-[#050505]">
        <div class="container px-4 md:px-6 py-2">
          <div class="flex h-14 items-center">
            <RouterLink
              to="/"
              class="h-full"
            >
              <img 
                class="h-full rounded-sm"
                src="@/assets/images/logo-512x512.png"
                alt="logo"
              >
            </RouterLink>

            <nav class="w-full ml-auto flex justify-end md:justify-center items-center space-x-4">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem class="md:hidden">
                    <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul class="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[minmax(0,.75fr)_minmax(0,1fr)]">
                        <li>
                          <NavigationMenuLink as-child>
                            <RouterLink :to="'/stats'">
                              <NavigationMenuLink>
                                <Button
                                  variant="text"
                                  type="button"
                                  class="text-black"
                                >
                                  Stats
                                </Button>
                              </NavigationMenuLink>
                            </RouterLink>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink as-child>
                            <RouterLink :to="'/observatoire'">
                              <NavigationMenuLink>
                                <Button
                                  variant="text"
                                  type="button"
                                  class="text-black"
                                >
                                  Observatoire
                                </Button>
                              </NavigationMenuLink>
                            </RouterLink>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink as-child>
                            <RouterLink :to="'/verifiez-votre-loyer'">
                              <NavigationMenuLink>
                                <Button
                                  variant="text"
                                  type="button"
                                  class="text-black"
                                >
                                  Vérifiez votre loyer
                                </Button>
                              </NavigationMenuLink>
                            </RouterLink>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink as-child>
                            <NavigationMenuLink>
                              <Button
                                variant="text"
                                type="button"
                                class="border border-[#fdcd56] text-[#fdcd56] hover:bg-[#fdcd56] hover:text-black transition-colors"
                                @click="scrollToDownload"
                              >
                                Installer l'extension
                              </Button>
                            </NavigationMenuLink>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <template class="hidden md:flex space-x-4">
                    <NavigationMenuItem>
                      <RouterLink :to="'/stats'">
                        <NavigationMenuLink>
                          <Button
                            variant="text"
                            type="button"
                            class="text-white"
                          >
                            Stats
                          </Button>
                        </NavigationMenuLink>
                      </RouterLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <RouterLink :to="'/observatoire'">
                        <NavigationMenuLink>
                          <Button
                            variant="text"
                            type="button"
                            class="text-white"
                          >
                            Observatoire 2024
                          </Button>
                        </NavigationMenuLink>
                      </RouterLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <RouterLink :to="'/verifiez-votre-loyer'">
                        <NavigationMenuLink>
                          <Button
                            variant="text"
                            type="button"
                            class="text-white"
                          >
                            Vérifiez votre loyer
                          </Button>
                        </NavigationMenuLink>
                      </RouterLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink>
                        <Button
                          variant="text"
                          type="button"
                          class="border border-[#fdcd56] text-[#fdcd56] hover:bg-[#fdcd56] hover:text-black transition-colors"
                          @click="scrollToDownload"
                        >
                          Installer l'extension
                        </Button>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </template>
                </NavigationMenuList>
              </NavigationMenu>
            </nav>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { Button } from '@/shadcn/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/shadcn/ui/navigation-menu'

const scrollToDownload = () => {
  const el = document.getElementById('download')
  console.log(el)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>