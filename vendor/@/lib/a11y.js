const focusVisibleRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-600';

function withFocusRing(classes) {
  return `${classes} ${focusVisibleRing}`.trim();
}

module.exports = {
  focusVisibleRing,
  withFocusRing,
};
