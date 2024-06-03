<script setup>
// =============================================================================
// Imports
// =============================================================================
import { Form } from "vee-validate"
import { authApi } from "@/services/api/index"
import { useRouter } from "vue-router"
import { useNotificationStore } from "@/stores/notificationStore"
import * as yup from "yup"

import { authBackground } from "@/assets/images"

// =============================================================================
// Composables, Refs & Computed
// =============================================================================
const router = useRouter()
const { addErrorNotification, addSuccesNotification } = useNotificationStore()

const loginFormValidationSchema = yup.object({
    email: yup.string().email("invalid email").required("an email is required!"),
    password: yup.string().required("a password is required required!")
})
// =============================================================================
// Functions
// =============================================================================
const LoginFormSubmit = async (values) => {
    const requestBody = {
        email: values.email,
        password: values.password
    }

    try {
        const { status, message, body } = await authApi.login(requestBody)

        if (status === 400) addErrorNotification({ message })
        if (status === 401) addErrorNotification({ message })

        if (status === 200) {
            addSuccesNotification({ message })
            setTimeout(() => router.push({ name: "DashboardPage" }), 1000)
        }
    } catch (error) {
        addErrorNotification({ message: "Server is not responding" })
    }
}
</script>

<template>
    <div class="login-page">
        <BaseContainer class="login-page__form-container" :is-clickable="false">
            <h2>Login</h2>

            <Form
                id="login-form"
                class="login-page__form"
                @submit="LoginFormSubmit"
                :validation-schema="loginFormValidationSchema"
                v-slot="{ isSubmitting }"
            >
                <div class="login-page__form-fields">
                    <BaseInput
                        id="login-form-email"
                        name="email"
                        type="email"
                        label="Email"
                        placeholder="Type your email"
                    />

                    <BasePasswordInput
                        id="login-form-password"
                        name="password"
                        label="Password"
                        placeholder="Choose a password"
                    />

                    <div class="login-page__link">
                        <p>Don't have an account?</p>

                        <RouterLink class="typo-body" :to="{ name: 'RegisterPage' }">
                            Sign up
                        </RouterLink>
                    </div>
                </div>

                <BaseButton :disabled="isSubmitting">Login</BaseButton>
            </Form>
        </BaseContainer>

        <img class="login-page__background" :src="authBackground" alt="page background" />
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/mixins.scss" as *;

.login-page {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: var(--space-16);

    @include styles-for(tablet) {
        grid-template-columns: repeat(12, 1fr);
        gap: var(--space-32);
    }

    &__form {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: var(--space-48);
    }

    &__form-fields {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: var(--space-24);
    }

    &__link {
        display: flex;
        gap: var(--space-8);
        align-items: center;

        & > a {
            color: var(--clr-neutral-100);
            font-weight: var(--fw-500);
        }
    }

    &__form-container {
        grid-column: span 6;
        max-width: 50rem;

        @include styles-for(desktop) {
            grid-column: span 4;
        }
    }

    &__background {
        position: fixed;
        inset: 0;
        width: 100vw;
        height: 100vh;
        z-index: -1;
        object-fit: cover;
        filter: brightness(0.8);
    }
}
</style>
