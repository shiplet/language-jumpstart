const { performance } = require("perf_hooks");

class SetupAndRunAlgorithm {
    constructor({ fn, list, length, debug }) {
        this.fn = fn;
        this.list = list || [];
        this.length = length;
        this.debug = debug || false;
        this.start = null;
        this.end = null;
        this.init = this.init.bind(this);
        this.run_algorithm_with_performance_metrics = this.run_algorithm_with_performance_metrics.bind(
            this
        );
        this.create_random_list_of_length = this.create_random_list_of_length.bind(
            this
        );
        this.log_results = this.log_results.bind(this);
        this.debug_log_unsorted_list = this.debug_log_unsorted_list.bind(this);
        this.debug_log_sorted_list = this.debug_log_sorted_list.bind(this);

        this.init();
    }

    init() {
        this.create_random_list_of_length();
        this.debug_log_unsorted_list();
        this.run_algorithm_with_performance_metrics();
        this.debug_log_sorted_list();
        this.log_results();
    }

    run_algorithm_with_performance_metrics() {
        var { fn, list } = this;

        this.start = performance.now();
        fn(list);
        this.end = performance.now();
    }

    create_random_list_of_length() {
        const { length, list } = this;

        for (let i = 0; i < length; i++) {
            list.push(Math.floor(Math.random(i) * length));
        }
    }

    log_results() {
        const { fn, list } = this;

        console.log("Algorithm: ", fn.name);
        console.log("Total Items: ", list.length);
        console.log(
            "Time to sort: ",
            (this.end - this.start).toFixed(3) + "ms"
        );
    }

    debug_log_unsorted_list() {
        const { debug, list } = this;
        if (debug) {
            console.log("DEBUG: unsorted =>", list);
        }
    }

    debug_log_sorted_list() {
        const { debug, list } = this;
        if (debug) {
            console.log("DEBUG: sorted => ", list);
        }
    }
}

module.exports = {
    SetupAndRunAlgorithm
};
