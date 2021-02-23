<template>
  <SettingsLayout :value="0">
    <SectionBlock title="general" description="generalDescription">
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <span>Dark Mode</span>
          <ThemeToggle toggle />
        </div>
        <div class="flex items-center justify-between">
          <span>Language</span>
          <LocaleSwitcher menu />
        </div>
      </div>
    </SectionBlock>
  </SettingsLayout>
</template>
