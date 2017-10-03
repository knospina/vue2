Vue.component('task-list', {

    'template': `
        <div>
            <task v-for="task in tasks" :key="task.task">{{task.task}}</task>
        </div>
    `,

    data() {

        return {
            'tasks': [
                {
                    'task': 'Go to the store',
                    'complete': true
                },
                {
                    'task': 'Go home',
                    'complete': true
                },
                {
                    'task': 'Read book',
                    'complete': false
                }]
        };

    }

});


Vue.component('task', {

    'template': '<li><slot></slot>{{message}}</li>',

    data() {
        return {
            'message': 'This is internal'
        };
    }

});

Vue.component('message', {

    'props': ['title', 'body'],

    data() {
        return {
            'isVisible': true
        };
    },

    'template': `
        <article class="message" v-show="isVisible">
            <div class="message-header">
                {{title}}
                <button type="button" @click="hideModal"> X </button>
            </div>
            <div class="message-body">
                {{body}}
            </div>
        </article>
    `,

    'methods': {
        hideModal() {

            this.isVisible = false;

        }
    }

});

Vue.component('modal', {

    'template': `
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="box">
                <slot></slot>
            </div>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="$emit('close')"></button>
    </div>
    `

});

new Vue({

    'el': '#root',

    'data': {
        'name': 'This is general',
        'showModal': false
    }

});
