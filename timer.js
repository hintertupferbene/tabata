const rounds = 8;

const interval_length = 20;
const pause_length = 10;

const remaining_out = document.getElementById('remaining');
const kind = document.getElementById('kind');

document.body.style.backgroundColor = "blue";


function update_remaining_out(remmaining) {
    remaining_out.innerHTML = remmaining + 's';
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function wait(ms) {
    console.log('before sleep');
    await sleep(ms);
}

class Timer {
    constructor(total_time) {
        this.remaining = total_time;
        update_remaining_out(this.remaining);
        console.log('remaining', this.remaining);
        this.interval_id = 0;
    }

    async start() {
        console.log('start');
        //this.interval_id = setInterval(this.count_down, 1000);
        console.log(this.remaining);
        while(this.remaining > 0) {
            await wait(1000);
            this.count_down();
        }
        playSound('bing');
    }

    count_down() {
        console.log('count_down', this.remaining);
        this.remaining -= 1;
        update_remaining_out(this.remaining);
    }
}

async function run() {
    var round;
    var timer;
    for(round = 1; round <= rounds; round++) {
        console.log('round start');
        document.getElementById('head').innerHTML = 'Round ' + round;
        
        kind.innerHTML = 'Pause';
        //kind.style.color = 'green';
        document.body.style.backgroundColor = "green";
        timer = new Timer(10);
        await timer.start();
        
        kind.innerHTML = 'Interval';
        //kind.style.color = 'red';
        document.body.style.backgroundColor = "red";
        timer = new Timer(20);
        await timer.start();

        if(round == rounds) {
            // final round is over
            kind.innerHTML = 'You made it';
            document.body.style.backgroundColor = "blue";
            break;
        }
        
        console.log('round end');
    }
}


function start_button() {
    run();
}

