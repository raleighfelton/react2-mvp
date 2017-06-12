function normalizeRating(rating) {
  if (rating > 1) { return 1; }
  if (rating < -1) { return -1; }
  return rating;
}

function tickLabelCheck(tick) {
  if (tick === 0) { return 'N'; }
  if (tick === -1) { return '-'; }
  if (tick === 1) { return '+'; }
  return;
}

export {
  normalizeRating,
  tickLabelCheck
};
