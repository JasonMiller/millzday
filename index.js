const DateDiff = {
	second: 1000,
	minute: 1000 * 60,
	hour:   1000 * 60 * 60,
	day:    1000 * 60 * 60 * 24,

  compareDateToNow (date) {
    let now = new Date();
    let diff = now - date;

    if (diff < 0) return -1;
    else if (diff >= this.day) return 1;
    else return 0;
  },

  getRemainingFromNow (date) {
    let now = new Date();
    let distance = date - now;

    return {
      days: Math.floor(distance / this.day),
      hours: Math.floor((distance % this.day) / this.hour),
      minutes: Math.floor((distance % this.hour) / this.minute),
      seconds: Math.floor((distance % this.minute) / this.second)
    };
	}
};

(function() {
  document.body.style.backgroundImage = `url('/img/${parseInt(Math.random() * 18)}.jpg')`;

  let heading = document.getElementById('heading');
  let month = 2;
  let day = 13;

  let now = new Date();
  let year = now.getFullYear();
  let date = new Date(`${month}/${day}/${year}`)

  if (DateDiff.compareDateToNow(date) > 0) {
    date = new Date(`${day}/${month}/${year + 1}`)
  }

	let timer = setInterval(showRemaining, 1000);

  function showRemaining() {
    if (DateDiff.compareDateToNow(date) == 0) {
      heading.innerText = 'MILLZDAY!!';

      clearInterval(timer);
    } else {
      const remaining = DateDiff.getRemainingFromNow(date);
      const countdown = `${remaining.days}d ${remaining.hours}h ${remaining.minutes}m ${remaining.seconds}s`;

      heading.innerText = countdown;
			document.title = `#millzday : ${countdown}`;
    }
  }
})();