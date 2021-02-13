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
      days: Math.floor(Math.abs(distance / this.day)),
      hours: Math.floor(Math.abs(distance % this.day) / this.hour),
      minutes: Math.floor(Math.abs(distance % this.hour) / this.minute),
      seconds: Math.floor(Math.abs(distance % this.minute) / this.second)
    };
	}
};

(function() {
  document.body.style.backgroundImage = `url('/img/${parseInt(Math.random() * 18)}.jpg')`;

  let a = document.getElementById('a');
  let {days, hours} = DateDiff.getRemainingFromNow(new Date('2/13/2021 19:00 GMT-0500'));

  if (days == 0 && hours < 4) {
    a.style.display = 'block';
  }

  let heading = document.getElementById('heading');
  let millzday = '2/13';

  let now = new Date();
  let year = now.getFullYear();
  let date = new Date(`${millzday}/${year}`)

  if (DateDiff.compareDateToNow(date) > 0) {
    date = new Date(`${millzday}/${year + 1}`)
  }

	let timer = setInterval(showRemaining, 1000);

  function showRemaining() {
    if (DateDiff.compareDateToNow(date) == 0) {
      heading.innerText = 'MillzDay!';

      clearInterval(timer);
    } else {
      const remaining = DateDiff.getRemainingFromNow(date);
      const countdown = `${remaining.days}d ${remaining.hours}h ${remaining.minutes}m ${remaining.seconds}s`;

      heading.innerText = countdown;
			document.title = `#millzday : ${countdown}`;
    }
  }
})();