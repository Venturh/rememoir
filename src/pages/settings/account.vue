<template>
  <SettingsLayout :notification="notification" :value="1">
    <SectionBlock
      title="account"
      description="settings:accountDescription"
      primary
    >
      <div class="space-y-4">
        <SectionBlock
          title="settings:passwordChange"
          description="settings:passwordChangeDescription"
          :primary="false"
        >
          <AuthForm
            type="save"
            :validation-schema="changePasswordSchema"
            @submit="changePassword"
          >
            <FormInput name="oldPassword" type="password" label="oldPassword" />
            <FormInput name="newPassword" type="password" label="newPassword" />
          </AuthForm>
        </SectionBlock>
        <SectionBlock
          title="settings:emailChange"
          description="settings:emailChangeDescription"
          :primary="false"
        >
          <AuthForm
            type="update"
            :validation-schema="changeEmailSchema"
            @submit="changeEmail"
          >
            <FormInput
              :placeholder="userInfo?.email"
              name="email"
              type="email"
              label="email"
            />
            <FormInput name="password" type="password" label="password" />
          </AuthForm>
        </SectionBlock>
        <SectionBlock
          title="settings:deleteAccount"
          description="settings:deleteAccountDescription"
          :primary="false"
        >
          <AuthForm
            type="delete"
            :validation-schema="deleteAccountSchema"
            @submit="deleteAccount"
          >
            <FormInput name="password2" type="password" label="password" />
          </AuthForm>
          <Modal
            v-model="deletAccountInfos.showModal"
            form
            name="closeAccount"
            @submit="deleteAccountSubmit"
            @cancel="deletAccountInfos.showModal = false"
          >
            <h1 class="font-semibold txt-lg">Close Account</h1>
            <p>
              Are you sure you want to deactivate your account? All of your data
              will be permanently removed from our servers forever. This action
              cannot be undone.
            </p>
          </Modal>
        </SectionBlock>
      </div>
    </SectionBlock>
  </SettingsLayout>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { object, string } from 'yup'
import { useNotification, useUserInfo } from '@/hooks'
import {
  useChangeEmailMutation,
  useChangePasswordMutation,
  useDeleteAccountMutation,
  useLogoutMutation,
} from '@/generated/graphql'
import { clearStorage } from '@/utils/auth'

const changePasswordInfos = reactive({ oldPassword: '', newPassword: '' })
const changeEmailInfos = reactive({ password: '', email: '' })
const deletAccountInfos = reactive({ password: '', showModal: false })

const { userInfo } = useUserInfo()
const { notification, setNotification } = useNotification()
const { push } = useRouter()

const { mutate: changePW } = useChangePasswordMutation(() => ({
  variables: {
    oldPassword: changePasswordInfos.oldPassword,
    newPassword: changePasswordInfos.newPassword,
  },
}))

const { mutate: changeMail } = useChangeEmailMutation(() => ({
  variables: {
    email: changeEmailInfos.email,
    password: changeEmailInfos.password,
  },
}))
const { mutate: deleteAcc } = useDeleteAccountMutation(() => ({
  variables: {
    password: deletAccountInfos.password,
  },
}))

const { mutate: logout } = useLogoutMutation()

const changePasswordSchema = object().shape({
  oldPassword: string().min(3).required(),
  newPassword: string().min(3).required(),
})
const changeEmailSchema = object().shape({
  email: string().email().required(),
  password: string().min(3).required(),
})
const deleteAccountSchema = object().shape({
  password2: string().min(3).required(),
})

async function changePassword(values: Object) {
  Object.assign(
    changePasswordInfos,
    values as { oldPassword: string; newPassword: string }
  )
  const { data } = await changePW()
  const { errors, message } = data!.changePassword
  if (errors) {
    setNotification({ show: true, type: 'error', text: errors.message })
  } else {
    setNotification({
      show: true,
      type: 'success',
      text: message!,
    })
  }
}

async function changeEmail(values: Object) {
  Object.assign(changeEmailInfos, values)
  const { data } = await changeMail()
  const { errors, message } = data!.changeEmail
  if (errors) {
    setNotification({ show: true, type: 'error', text: errors.message })
  } else {
    setNotification({
      show: true,
      type: 'success',
      text: message!,
    })
  }
}

async function deleteAccount(values: Object) {
  const v = values as { password2: string }
  deletAccountInfos.password = v.password2
  deletAccountInfos.showModal = true
}
async function deleteAccountSubmit() {
  const { data } = await deleteAcc()
  const { errors } = data!.deleteAccount
  if (errors) {
    setNotification({ show: true, type: 'error', text: errors.message })
  } else {
    await clearStorage()
    await logout()
    push('/')
  }
}
</script>
