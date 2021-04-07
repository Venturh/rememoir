<template>
  <LandingLayout>
    <div
      class="max-w-md px-4 mx-auto sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl lg:grid lg:grid-cols-2 lg:gap-24"
    >
      <div>
        <div class="space-y-2">
          <Logo class="w-auto h-12 mb-12 lg:h-16" />
          <div class="flex items-center space-x-2">
            <Label class="tracking-wide uppercase" variant="brand25">
              {{ t('whatsnew') }}
            </Label>
            <router-link to="/changelog/01" class="flex items-center space-x-2">
              <p class="text-brand">{{ t('whatsnew1') }}</p>
              <Icon
                :icon="RiArrowRightSLine"
                class="flex-shrink-0"
                color="brand"
                size="sm"
              />
            </router-link>
          </div>
          <h1 class="text-3xl font-bold sm:text-4xl text-primary">
            {{ t('l_hero1') }}
            <span class="text-brand">{{ t('l_hero2') }} </span
            >{{ t('l_hero3') }}
            <span class="text-brand">{{ t('l_hero4') }} </span>
          </h1>
          <h2 class="text-lg sm:text-xl text-primary">
            {{ t('l_hero_sub') }}
          </h2>
        </div>
        <div v-if="!hasAuth" class="flex w-full mt-6 space-x-4">
          <Button
            padding
            class="px-6 py-3"
            variant="brand25"
            @click="push('/auth/login')"
          >
            {{ t('login') }}
          </Button>
          <Button
            padding
            class="px-6 py-3"
            variant="1"
            @click="push('/auth/register')"
          >
            {{ t('register') }}</Button
          >
        </div>
        <Button
          v-else
          padding
          class="px-6 py-3 mt-6"
          variant="1"
          @click="push('/home')"
        >
          {{ t('continue') }}</Button
        >
      </div>
      <div
        class="py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2"
      >
        <img
          class="rounded-md shadow-xl ring-1 ring-black dark:ring-white ring-opacity-5 lg:h-full lg:max-w-2xl"
          src="/images/landing_2.png"
          alt="landing"
          loading="lazy"
        />
      </div>
    </div>
  </LandingLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { RiArrowRightSLine } from 'vue-remix-icons'
import { useRouter } from 'vue-router'
import { getAccessToken } from '@/utils/auth'
const { t } = useI18n()
const { push } = useRouter()
const hasAuth = computed(() => {
  return getAccessToken() === '' ? false : true
})
</script>
