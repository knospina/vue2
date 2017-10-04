window.Event = new class {

    constructor() {

        this.vue = new Vue();

    }

    fire(event, data = null) {

        this.vue.$emit(event, data);

    }

    listen(event, callback) {

        this.vue.$on(event, callback);

    }

}

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
    <div class="moda is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Modal title</p>
          <button class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          Temporary content goes here
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success">Save changes</button>
          <button class="button">Cancel</button>
        </footer>
      </div>
    </div>
    `

});

Vue.component('tabs', {

    'template': `
        <nav>
            <div class="tabs">
                <ul>
                    <li v-for="tab in tabs" :class="{ 'is-active': tab.isActive }">
                        <a :href="tab.href" @click="selectTab(tab)">
                            {{tab.name}}
                        </a>

                    </li>
                </ul>
            </div>

            <div class="tabs-details">
                <slot></slot>
            </div>
        </nav>
    `,

    data() {
        return {
            'tabs': []
        }
    },


    created() {

        this.tabs = this.$children;

    },

    'methods': {
        selectTab(selectedTab) {

            this.tabs.forEach(tab => {

                tab.isActive = (tab.name == selectedTab.name);

            });

        }
    }

});

Vue.component('tab', {

    'template': `
        <div v-show="isActive">
            <slot></slot>
        </div>
    `,

    'props': {
        'name': {
            'required': true
        },
        'selected': {
            'default': false
        }
    },

    data() {
        return {
            'isActive': false
        };
    },

    'computed': {

        href() {
            return '#' + this.name.toLowerCase().replace(/ /g, '-');
        }

    },

    mounted() {
        this.isActive = this.selected;
    }


});

Vue.component('coupon', {
    'template': `
        <input placeholder="Enter your coupon code" @blur="onCouponApplied">

    `,

    methods: {
        onCouponApplied() {
            Event.fire('applied');
        }
    }
})

new Vue({

    'el': '#root',

    'data': {
        'name': 'This is general',
        'showModal': false,
        'couponApplied': false
    },

    created() {
        Event.listen('applied', () => alert('Handling it'))
    }

});
