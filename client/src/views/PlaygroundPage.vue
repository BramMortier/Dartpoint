<script setup>
import { Form } from "vee-validate"
import * as yup from "yup"

const handleSubmit = async (values) => {
    console.log(values)
}

const validationSchema = yup.object({
    email: yup.string().required("Email is required"),
    password: yup.string().min(6).required("Password is required")
})
</script>

<template>
    <section class="playground-page">
        <BaseIcon name="wordmark-horizontal-light" />
        <BaseContainer class="playground-page__buttons">
            <BaseButton> Primary button </BaseButton>
            <BaseButton class="base-button--secondary"> Secondary button </BaseButton>
            <BaseButton class="base-button--tertiary">Tertiary button</BaseButton>
        </BaseContainer>
        <BaseContainer class="playground-page__inputs">
            <Form @submit="handleSubmit" :validation-schema="validationSchema">
                <div>
                    <BaseInput name="email" placeholder="type your email" label="Email" />
                    <BaseInput
                        name="password"
                        type="password"
                        placeholder="type a password"
                        label="Password"
                    />
                </div>
                <BaseButton>Register account</BaseButton>
            </Form>
        </BaseContainer>
        <BaseContainer class="playground-page__typography">
            <div>
                <h1>Start a game or throw a dart</h1>
                <h2>My connected dartboards</h2>
                <h3>Choose a game type</h3>
                <h4>Last 10 darts T20 percentage</h4>
            </div>

            <div>
                <p class="typo-body-large">
                    Ut autem cumque dolores nulla explicabo tenetur amet consequatur ipsum officia
                    minus. Eveniet cum placeat dolorem porro! Blanditiis laudantium accusantium
                    eligendi quidem magnam nulla similique suscipit dicta quo iure vitae, aliquam
                    quas!
                </p>
                <p>
                    Cumque, eius? Aspernatur assumenda nesciunt itaque reiciendis fugiat eligendi
                    recusandae, rem amet provident error vero impedit, molestias quidem maiores
                    ratione sit officia, hic animi tempore voluptates quod nam accusantium nisi
                    ipsa. Aliquid.
                </p>
            </div>
        </BaseContainer>
    </section>
</template>

<style scoped lang="scss">
.playground-page {
    padding: var(--space-32);
    display: flex;
    flex-direction: column;
    gap: var(--space-32);

    & > svg {
        max-width: 25rem;
    }

    &__typography {
        div {
            display: flex;
            flex-direction: column;
            gap: var(--space-8);
        }
    }

    &__inputs {
        form {
            display: flex;
            flex-direction: column;
            gap: var(--space-32);

            & > div {
                display: flex;
                flex-direction: column;
                gap: var(--space-16);
            }
        }
    }
}
</style>
