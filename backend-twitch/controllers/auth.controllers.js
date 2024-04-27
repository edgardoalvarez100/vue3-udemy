export const register = (req, res, next) => {
  res.json({ ok: true, email: req.body });
};

export const login = (req, res) => {
  res.json({ ok: true });
};
