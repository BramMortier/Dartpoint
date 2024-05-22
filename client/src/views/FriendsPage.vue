<script setup>
// =============================================================================
// Imports
// =============================================================================
import { FriendsList, FriendsRequestsList, FriendsSendRequest } from "@/components/index"
import { ref } from "vue"

// =============================================================================
// Props & Events
// =============================================================================

// =============================================================================
// Composables, Refs & Computed
// =============================================================================
const tabOptions = {
    list: "list",
    requestsList: "requests-list",
    sendRequest: "send-request"
}
const activeTab = ref("list")

// =============================================================================
// Functions
// =============================================================================
const changeTab = (tab) => {
    activeTab.value = tab
    console.log(activeTab.value)
}
</script>

<template>
    <div class="friends-page">
        <BaseContainer class="friends-page__list" :is-clickable="false">
            <FriendsList v-if="activeTab === tabOptions.list" />

            <FriendsRequestsList v-if="activeTab === tabOptions.requestsList" />

            <FriendsSendRequest v-if="activeTab === tabOptions.sendRequest" />
        </BaseContainer>

        <div class="friends-page__action-buttons">
            <BaseContainer
                class="friends-page__add-friends"
                @click="changeTab(tabOptions.sendRequest)"
            >
                <h2>Add Friends</h2>
            </BaseContainer>

            <BaseContainer
                class="friends-page__friend-requests"
                @click="changeTab(tabOptions.requestsList)"
            >
                <p class="typo-body-large">New request(s)</p>

                <div>
                    <h2>Friend requests</h2>
                    <h2>0</h2>
                </div>
            </BaseContainer>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/mixins.scss" as *;

.friends-page {
    display: flex;
    flex-direction: column;
    gap: var(--space-16);

    @include styles-for(tablet) {
        gap: var(--space-24);
    }

    @include styles-for(desktop) {
        gap: var(--space-32);
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        height: 100%;
    }

    &__list {
        grid-column: span 8;
        min-height: 400px;
        max-height: 500px;

        @include styles-for(desktop) {
            max-height: unset;
        }
    }

    &__action-buttons {
        grid-column: span 4;
        display: flex;
        flex-direction: column;
        gap: var(--space-16);

        @include styles-for(tablet) {
            flex-direction: row;
            gap: var(--space-24);
        }

        @include styles-for(desktop) {
            flex-direction: column;
            gap: var(--space-32);
        }
    }

    &__add-friends,
    &__friend-requests {
        justify-content: flex-end;
        width: 100%;
        height: max(33vh, 160px);

        @include styles-for(tablet) {
            height: max(33vh, 200px);
        }

        @include styles-for(desktop) {
            height: max(33vh, 300px);
        }
    }

    &__friend-requests {
        gap: var(--space-4);

        & > div {
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>
