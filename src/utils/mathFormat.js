const DISPLAY_DELIMITER = /\\\[|\\\(|\$\$/;

const EXACT_EXPRESSIONS = new Map([
  ["v = v0 + a t", String.raw`v = v_0 + at`],
  ["v = v0 + at", String.raw`v = v_0 + at`],
  ["x = x0 + v0 t + 1/2 a t^2", String.raw`x = x_0 + v_0t + \frac{1}{2}at^2`],
  ["x = x0 + v0 t + (1/2) a t^2", String.raw`x = x_0 + v_0t + \frac{1}{2}at^2`],
  ["v^2 = v0^2 + 2 a (x - x0)", String.raw`v^2 = v_0^2 + 2a(x - x_0)`],
  ["sum F = ma", String.raw`\sum F = ma`],
  ["sum F = m a", String.raw`\sum F = ma`],
  ["W = F d cos(theta)", String.raw`W = Fd\cos\theta`],
  ["E_c = 1/2 m v^2", String.raw`E_c = \frac{1}{2}mv^2`],
  ["E_c = (1/2) m v^2", String.raw`E_c = \frac{1}{2}mv^2`],
  ["F = -kx", String.raw`F = -kx`],
  ["F = -k x", String.raw`F = -kx`],
  ["g = G M / r^2", String.raw`g = G\frac{M}{r^2}`],
  ["E = F/q", String.raw`E = \frac{F}{q}`],
  ["F = qE", String.raw`F = qE`],
  ["F = k |q1 q2| / r^2", String.raw`F = k\frac{|q_1q_2|}{r^2}`],
  ["F = k q1 q2 / r^2", String.raw`F = k\frac{q_1q_2}{r^2}`],
  ["F = k |q1 q2| / r^2", String.raw`F = k\frac{|q_1q_2|}{r^2}`],
  ["E = k |q| / r^2", String.raw`E = k\frac{|q|}{r^2}`],
  ["E = k Q/r^2", String.raw`E = k\frac{Q}{r^2}`],
  ["E = k Q / r^2", String.raw`E = k\frac{Q}{r^2}`],
  ["Phi_E = E A cos(theta)", String.raw`\Phi_E = EA\cos\theta`],
  ["Phi_E = Q_enc/epsilon0", String.raw`\Phi_E = \frac{Q_{\text{enc}}}{\varepsilon_0}`],
  ["integral E.dA = Q_enc/epsilon0", String.raw`\oint \vec{E}\cdot d\vec{A} = \frac{Q_{\text{enc}}}{\varepsilon_0}`],
  ["integral E.dA = Q_enc / epsilon0", String.raw`\oint \vec{E}\cdot d\vec{A} = \frac{Q_{\text{enc}}}{\varepsilon_0}`],
  ["integral E dA = Q_enc/epsilon0", String.raw`\oint \vec{E}\cdot d\vec{A} = \frac{Q_{\text{enc}}}{\varepsilon_0}`],
  ["integral E dA = Q_enc / epsilon0", String.raw`\oint \vec{E}\cdot d\vec{A} = \frac{Q_{\text{enc}}}{\varepsilon_0}`],
  ["INTEGRALEDA = QENC/E0", String.raw`\oint \vec{E}\cdot d\vec{A} = \frac{Q_{\text{enc}}}{\varepsilon_0}`],
  ["E = sigma / (2 epsilon0)", String.raw`E = \frac{\sigma}{2\varepsilon_0}`],
  ["E = sigma/(2 epsilon0)", String.raw`E = \frac{\sigma}{2\varepsilon_0}`],
  ["plano infinito: E = sigma/(2 epsilon0)", String.raw`E = \frac{\sigma}{2\varepsilon_0}`],
  ["PLANO INFINITO: E = sigma/(2 epsilon0)", String.raw`E = \frac{\sigma}{2\varepsilon_0}`],
  [String.raw`E = \SIGMA/(2 \VARVAREPSILON_0)`, String.raw`E = \frac{\sigma}{2\varepsilon_0}`],
  [String.raw`PLANO INFINITO: E = \SIGMA/(2 \VARVAREPSILON_0)`, String.raw`E = \frac{\sigma}{2\varepsilon_0}`],
  ["E_int = rho r / (3 epsilon0)", String.raw`E_{\mathrm{int}} = \frac{\rho r}{3\varepsilon_0}`],
  ["W_cerrado = 0", String.raw`W_{\mathrm{cerrado}} = 0`],
  ["v = dr/dt", String.raw`v = \frac{dr}{dt}`],
  ["a = dv/dt", String.raw`a = \frac{dv}{dt}`],
  ["a_c = v^2/r", String.raw`a_c = \frac{v^2}{r}`],
  ["a_c = v^2 / r", String.raw`a_c = \frac{v^2}{r}`],
  ["T = 1/f", String.raw`T = \frac{1}{f}`],
  ["f = 1/T", String.raw`f = \frac{1}{T}`],
  ["V = U/q", String.raw`V = \frac{U}{q}`],
  ["V = k q / r", String.raw`V = k\frac{q}{r}`],
  ["V = kq/r", String.raw`V = k\frac{q}{r}`],
  ["Delta U = q Delta V", String.raw`\Delta U = q\Delta V`],
  ["U = q V", String.raw`U = qV`],
  ["U = qV", String.raw`U = qV`],
  ["E = -dV/dx", String.raw`E = -\frac{dV}{dx}`],
  ["C = Q/V", String.raw`C = \frac{Q}{V}`],
  ["1 F = 1 C/V", String.raw`1\,\mathrm{F}=1\,\mathrm{C/V}`],
  ["1 A = 1 C/s", String.raw`1\,\mathrm{A}=1\,\mathrm{C/s}`],
  ["1 V = 1 J/C", String.raw`1\,\mathrm{V}=1\,\mathrm{J/C}`],
  ["1 T = N/(A m)", String.raw`1\,\mathrm{T}=1\,\mathrm{N/(A\,m)}`],
  ["C = epsilon0 A / d", String.raw`C = \frac{\varepsilon_0 A}{d}`],
  ["C = epsilon0 A/d", String.raw`C = \frac{\varepsilon_0 A}{d}`],
  ["C = kappa epsilon0 A / d", String.raw`C = \frac{\kappa\varepsilon_0 A}{d}`],
  ["E = V/d", String.raw`E = \frac{V}{d}`],
  ["U = 1/2 C V^2", String.raw`U = \frac{1}{2}CV^2`],
  ["U = (1/2) C V^2", String.raw`U = \frac{1}{2}CV^2`],
  ["U = Q^2/(2C)", String.raw`U = \frac{Q^2}{2C}`],
  ["U = (1/2) C V^2 = Q^2/(2C) = (1/2) QV", String.raw`U = \frac{1}{2}CV^2 = \frac{Q^2}{2C} = \frac{1}{2}QV`],
  ["Ceq = C1 + C2", String.raw`C_{\mathrm{eq}} = C_1 + C_2`],
  ["Ceq = C1 + C2 + ...", String.raw`C_{\mathrm{eq}} = C_1 + C_2 + \cdots`],
  ["Ceq = sum(C_i)", String.raw`C_{\mathrm{eq}} = \sum C_i`],
  ["1/Ceq = 1/C1 + 1/C2", String.raw`\frac{1}{C_{\mathrm{eq}}} = \frac{1}{C_1} + \frac{1}{C_2}`],
  ["1/Ceq = 1/C1 + 1/C2 + ...", String.raw`\frac{1}{C_{\mathrm{eq}}} = \frac{1}{C_1} + \frac{1}{C_2} + \cdots`],
  ["1/Ceq = sum(1/C_i)", String.raw`\frac{1}{C_{\mathrm{eq}}} = \sum \frac{1}{C_i}`],
  ["E = E0/kappa", String.raw`E = \frac{E_0}{\kappa}`],
  ["E = E0 / kappa", String.raw`E = \frac{E_0}{\kappa}`],
  ["Vmax = Emax d", String.raw`V_{\max}=E_{\max}d`],
  ["C = 4 pi epsilon0 R", String.raw`C = 4\pi\varepsilon_0R`],
  ["V_total = sum(k qi/ri)", String.raw`V_{\mathrm{total}}=\sum k\frac{q_i}{r_i}`],
  ["I = dQ/dt", String.raw`I = \frac{dQ}{dt}`],
  ["I = Q/t", String.raw`I = \frac{Q}{t}`],
  ["Delta V = I R", String.raw`\Delta V = IR`],
  ["Delta V = IR", String.raw`\Delta V = IR`],
  ["R = rho L / A", String.raw`R = \rho\frac{L}{A}`],
  ["R = rho L/A", String.raw`R = \rho\frac{L}{A}`],
  ["P = V I = I^2 R = V^2/R", String.raw`P = VI = I^2R = \frac{V^2}{R}`],
  ["P = VI = I^2 R = V^2/R", String.raw`P = VI = I^2R = \frac{V^2}{R}`],
  ["P = I^2 R", String.raw`P = I^2R`],
  ["Req = R1 + R2 + ...", String.raw`R_{\mathrm{eq}}=R_1+R_2+\cdots`],
  ["Req = sum(R_i)", String.raw`R_{\mathrm{eq}}=\sum R_i`],
  ["1/Req = 1/R1 + 1/R2 + ...", String.raw`\frac{1}{R_{\mathrm{eq}}}=\frac{1}{R_1}+\frac{1}{R_2}+\cdots`],
  ["1/Req = sum(1/R_i)", String.raw`\frac{1}{R_{\mathrm{eq}}}=\sum\frac{1}{R_i}`],
  ["F_m = |q| v B sin(theta)", String.raw`F_m = |q|vB\sin\theta`],
  ["F_m = q v x B", String.raw`\vec{F}_m = q\vec{v}\times\vec{B}`],
  ["F = |q| v B", String.raw`F = |q|vB`],
  ["F = |q| v B sin(theta)", String.raw`F = |q|vB\sin\theta`],
  ["F = q v B sen theta", String.raw`F = qvB\sin\theta`],
  ["F = q v B sin theta", String.raw`F = qvB\sin\theta`],
  ["r = m v / (|q| B)", String.raw`r = \frac{mv}{|q|B}`],
  ["qE = qvB", String.raw`qE = qvB`],
  ["v = E/B", String.raw`v = \frac{E}{B}`],
  ["F = I L B sin(theta)", String.raw`F = ILB\sin\theta`],
  ["B = mu0 I / (2 pi r)", String.raw`B = \frac{\mu_0 I}{2\pi r}`],
  ["integral B.dl = mu0 I_enc", String.raw`\oint \vec{B}\cdot d\vec{l} = \mu_0 I_{\mathrm{enc}}`],
  ["B = mu0 n I", String.raw`B = \mu_0 nI`],
  ["Phi_B = B A cos(theta)", String.raw`\Phi_B = BA\cos\theta`],
  ["Phi = B A cos theta", String.raw`\Phi = BA\cos\theta`],
  ["Phi = B A cos(theta)", String.raw`\Phi = BA\cos\theta`],
  ["epsilon = -dPhi_B/dt", String.raw`\varepsilon = -\frac{d\Phi_B}{dt}`],
  ["epsilon = - dPhi_B/dt", String.raw`\varepsilon = -\frac{d\Phi_B}{dt}`],
  ["epsilon = -N dPhi_B/dt", String.raw`\varepsilon = -N\frac{d\Phi_B}{dt}`],
  ["epsilon = -dPhi/dt", String.raw`\varepsilon = -\frac{d\Phi}{dt}`],
  ["epsilon = - dPhi/dt", String.raw`\varepsilon = -\frac{d\Phi}{dt}`],
  ["epsilon_L = -L dI/dt", String.raw`\varepsilon_L = -L\frac{dI}{dt}`],
  ["U_L = (1/2) L I^2", String.raw`U_L = \frac{1}{2}LI^2`],
  ["x(t)=A cos(omega t + phi)", String.raw`x(t)=A\cos(\omega t+\varphi)`],
  ["omega = 2 pi/T = 2 pi f", String.raw`\omega = \frac{2\pi}{T}=2\pi f`],
  ["T = 2 pi sqrt(m/k)", String.raw`T = 2\pi\sqrt{\frac{m}{k}}`],
  ["vmax = A omega", String.raw`v_{\max}=A\omega`],
  ["a = -omega^2 x", String.raw`a=-\omega^2x`],
  ["E = (1/2) k A^2", String.raw`E=\frac{1}{2}kA^2`],
  ["y(x,t)=A cos(kx - omega t + phi)", String.raw`y(x,t)=A\cos(kx-\omega t+\varphi)`],
  ["v = lambda f", String.raw`v=\lambda f`],
  ["v = lambda f = omega/k", String.raw`v=\lambda f=\frac{\omega}{k}`],
  ["k = 2 pi/lambda", String.raw`k=\frac{2\pi}{\lambda}`],
  ["I = P/(4 pi r^2)", String.raw`I=\frac{P}{4\pi r^2}`],
  ["beta = 10 log10(I/I0)", String.raw`\beta=10\log_{10}\left(\frac{I}{I_0}\right)`],
  ["f_batido = |f1 - f2|", String.raw`f_{\mathrm{batido}}=|f_1-f_2|`],
  ["x_n = n lambda/2", String.raw`x_n=\frac{n\lambda}{2}`],
  ["f_n = n v/(2L)", String.raw`f_n=\frac{nv}{2L}`],
  ["f_n = n v/(4L), n impar", String.raw`f_n=\frac{nv}{4L},\quad n\,\mathrm{impar}`],
  ["c = 1/sqrt(epsilon0 mu0)", String.raw`c=\frac{1}{\sqrt{\varepsilon_0\mu_0}}`],
  ["E = c B", String.raw`E=cB`],
  ["E = h f = h c/lambda", String.raw`E=hf=\frac{hc}{\lambda}`],
  ["n = c/v", String.raw`n=\frac{c}{v}`],
  ["n1 sin(theta1)=n2 sin(theta2)", String.raw`n_1\sin\theta_1=n_2\sin\theta_2`],
  ["theta_c = arcsin(n2/n1)", String.raw`\theta_c=\arcsin\left(\frac{n_2}{n_1}\right)`],
  ["I = I0 cos^2(theta)", String.raw`I=I_0\cos^2\theta`],
  ["E_c,max = h f - W", String.raw`E_{c,\max}=hf-W`],
  ["f0 = W/h", String.raw`f_0=\frac{W}{h}`],
  ["E_foton aprox E_g", String.raw`E_{\mathrm{foton}}\approx E_g`],
  ["E_foton >= E_g", String.raw`E_{\mathrm{foton}}\ge E_g`],
  ["I_C = beta I_B", String.raw`I_C=\beta I_B`],
  ["mu = I A", String.raw`\mu=IA`],
  ["tau = mu B sin(theta)", String.raw`\tau=\mu B\sin\theta`],
  ["K_media = 3/2 k_B T", String.raw`K_{\mathrm{media}}=\frac{3}{2}k_BT`],
  ["K_media = (3/2) k_B T", String.raw`K_{\mathrm{media}}=\frac{3}{2}k_BT`],
  ["T(K)=T(C)+273,15", String.raw`T(\mathrm{K})=T(^{\circ}\mathrm{C})+273{,}15`],
  ["Delta U = Q - W", String.raw`\Delta U=Q-W`],
  ["W = 0", String.raw`W=0`],
  ["Q = 0", String.raw`Q=0`],
  ["Q = c m Delta T", String.raw`Q=cm\Delta T`],
  ["Q = m c DeltaT", String.raw`Q=mc\Delta T`],
  ["Q = L m", String.raw`Q=Lm`],
  ["Q = m L", String.raw`Q=mL`],
  ["eta = W / Q_caliente", String.raw`\eta=\frac{W}{Q_{\mathrm{caliente}}}`],
  ["eta = 1 - T_fria/T_caliente", String.raw`\eta=1-\frac{T_{\mathrm{fria}}}{T_{\mathrm{caliente}}}`],
  ["COP = Q_fria / W", String.raw`\mathrm{COP}=\frac{Q_{\mathrm{fria}}}{W}`],
  ["COP_R = T_fria/(T_caliente - T_fria)", String.raw`\mathrm{COP}_R=\frac{T_{\mathrm{fria}}}{T_{\mathrm{caliente}}-T_{\mathrm{fria}}}`],
  ["dS = dQ_rev/T", String.raw`dS=\frac{dQ_{\mathrm{rev}}}{T}`],
  ["Delta S_universo > 0", String.raw`\Delta S_{\mathrm{universo}}>0`],
  ["P = h A (T - T_amb)", String.raw`P=hA(T-T_{\mathrm{amb}})`],
  ["P = h A (T - Tamb)", String.raw`P=hA(T-T_{\mathrm{amb}})`],
  ["P = h A (T - T_fluido)", String.raw`P=hA(T-T_{\mathrm{fluido}})`],
  ["P = h A DeltaT", String.raw`P=hA\Delta T`],
  ["P = -h A (T - T_amb)", String.raw`P=-hA(T-T_{\mathrm{amb}})`],
  ["P = k A DeltaT / d", String.raw`P=\frac{kA\Delta T}{d}`],
  ["P = sigma e A T^4", String.raw`P=\sigma eAT^4`],
  ["F proporcional a 1/r^2", String.raw`F\propto\frac{1}{r^2}`],
  ["E proporcional a r", String.raw`E\propto r`],
  ["P proporcional a T^4", String.raw`P\propto T^4`],
  ["E_g: gap de banda", String.raw`E_g`],
  ["R_cond = d/(k A)", String.raw`R_{\mathrm{cond}}=\frac{d}{kA}`],
  ["R_conv = 1/(h A)", String.raw`R_{\mathrm{conv}}=\frac{1}{hA}`],
  ["DeltaT = P R", String.raw`\Delta T=PR`],
  ["R_total = R1 + R2", String.raw`R_{\mathrm{total}}=R_1+R_2`],
]);

const INLINE_REPLACEMENTS = [...EXACT_EXPRESSIONS.keys()].sort((a, b) => b.length - a.length);

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function isDelimited(value) {
  return DISPLAY_DELIMITER.test(value);
}

export function normalizeLatexCommands(value) {
  return String(value)
    .replace(/\\+SIGMA(?=[^A-Za-z]|$)/g, String.raw`\sigma`)
    .replace(/\\+VARVAREPSILON(?=[^A-Za-z]|$)/g, String.raw`\varepsilon`)
    .replace(/\\+VAREPSILON(?=[^A-Za-z]|$)/g, String.raw`\varepsilon`)
    .replace(/\\+EPSILON(?=[^A-Za-z]|$)/g, String.raw`\varepsilon`)
    .replace(/\\+LAMBDA(?=[^A-Za-z]|$)/g, String.raw`\lambda`)
    .replace(/\\+THETA(?=[^A-Za-z]|$)/g, String.raw`\theta`)
    .replace(/\\+PHI(?=[^A-Za-z]|$)/g, String.raw`\Phi`)
    .replace(/\\+OMEGA(?=[^A-Za-z]|$)/g, String.raw`\omega`)
    .replace(/\\+PI(?=[^A-Za-z]|$)/g, String.raw`\pi`)
    .replace(/\\+SEN(?=[^A-Za-z]|$)/g, String.raw`\sin`)
    .replace(/\\+sen(?=[^A-Za-z]|$)/g, String.raw`\sin`)
    .replace(/\\+TG(?=[^A-Za-z]|$)/g, String.raw`\tan`)
    .replace(/\\+tg(?=[^A-Za-z]|$)/g, String.raw`\tan`);
}

function normalizeExpression(expression) {
  const cleanedExpression = normalizeLatexCommands(expression).trim();
  const exact = EXACT_EXPRESSIONS.get(cleanedExpression);
  if (exact) return exact;

  return cleanedExpression
    .replace(/×/g, String.raw`\times`)
    .replace(/ x /g, String.raw` \times `)
    .replace(/>=/g, String.raw`\ge`)
    .replace(/<=/g, String.raw`\le`)
    .replace(/aprox/g, String.raw`\approx`)
    .replace(/(?<!\\)\bDeltaT\b/g, String.raw`\Delta T`)
    .replace(/(?<!\\)\bDelta\b/g, String.raw`\Delta`)
    .replace(/(?<!\\)\bPhi\b/g, String.raw`\Phi`)
    .replace(/(?<!\\)\bepsilon0\b/g, String.raw`\varepsilon_0`)
    .replace(/(?<!\\)\bepsilon\b/g, String.raw`\varepsilon`)
    .replace(/(?<!\\)\bmu0\b/g, String.raw`\mu_0`)
    .replace(/(?<!\\)\bmu\b/g, String.raw`\mu`)
    .replace(/(?<!\\)\blambda\b/g, String.raw`\lambda`)
    .replace(/(?<!\\)\bomega\b/g, String.raw`\omega`)
    .replace(/(?<!\\)\btheta\b/g, String.raw`\theta`)
    .replace(/(?<!\\)\bkappa\b/g, String.raw`\kappa`)
    .replace(/(?<!\\)\bsigma\b/g, String.raw`\sigma`)
    .replace(/(?<!\\)\brho\b/g, String.raw`\rho`)
    .replace(/(^|[^A-Za-z\\])beta\b/g, String.raw`$1\beta`)
    .replace(/(^|[^A-Za-z\\])eta\b/g, String.raw`$1\eta`)
    .replace(/(?<!\\)\btau\b/g, String.raw`\tau`)
    .replace(/(?<!\\)\bpi\b/g, String.raw`\pi`)
    .replace(/sqrt\(([^)]+)\)/g, String.raw`\sqrt{$1}`)
    .replace(/log10/g, String.raw`\log_{10}`)
    .replace(/arcsin/g, String.raw`\arcsin`)
    .replace(/\btg\b/g, String.raw`\tan`)
    .replace(/\\?sen\s*\\theta/g, String.raw`\sin\theta`)
    .replace(/\\?sin\(\\theta\)/g, String.raw`\sin\theta`)
    .replace(/\\?sin\s*\\theta/g, String.raw`\sin\theta`)
    .replace(/\\?cos\(\\theta\)/g, String.raw`\cos\theta`)
    .replace(/\\?cos\s*\\theta/g, String.raw`\cos\theta`)
    .replace(/\bsen\b/g, String.raw`\sin`)
    .replace(/1\/2/g, String.raw`\frac{1}{2}`)
    .replace(/\\sigma\s*\/\s*\(\s*2\s*\\varepsilon_0\s*\)/g, String.raw`\frac{\sigma}{2\varepsilon_0}`)
    .replace(/\\Phi_B\s*=\s*B\s*A\s*\\cos\s*\\theta/g, String.raw`\Phi_B = BA\cos\theta`)
    .replace(/\\varepsilon\s*=\s*-\s*d\\Phi_B\s*\/\s*dt/g, String.raw`\varepsilon = -\frac{d\Phi_B}{dt}`)
    .replace(/\\varepsilon\s*=\s*-\s*d\\Phi\s*\/\s*dt/g, String.raw`\varepsilon = -\frac{d\Phi}{dt}`)
    .replace(/\\lambda\s*f/g, String.raw`\lambda f`)
    .replace(/\((\\frac\{1\}\{2\})\)/g, "$1")
    .replace(/\b([A-Za-z])([0-9])\b/g, "$1_$2")
    .replace(/\b([A-Za-z])_0\b/g, "$1_0")
    .replace(/\b([A-Za-z])_1\b/g, "$1_1")
    .replace(/\b([A-Za-z])_2\b/g, "$1_2")
    .replace(/\b10\^(-?\d+)/g, "10^{$1}")
    .replace(/\b([A-Za-z])\^(-?\d+)/g, "$1^{$2}")
    .replace(/Q_enc/g, String.raw`Q_{\mathrm{enc}}`)
    .replace(/I_enc/g, String.raw`I_{\mathrm{enc}}`)
    .replace(/T_amb/g, String.raw`T_{\mathrm{amb}}`)
    .replace(/T_fria/g, String.raw`T_{\mathrm{fria}}`)
    .replace(/T_caliente/g, String.raw`T_{\mathrm{caliente}}`)
    .replace(/Q_fria/g, String.raw`Q_{\mathrm{fria}}`)
    .replace(/Q_caliente/g, String.raw`Q_{\mathrm{caliente}}`)
    .replace(/Ceq/g, String.raw`C_{\mathrm{eq}}`)
    .replace(/Req/g, String.raw`R_{\mathrm{eq}}`);
}

function normalizeDelimitedMath(text) {
  return normalizeLatexCommands(text)
    .replace(/\\\[([\s\S]*?)\\\]/g, (_, expression) => String.raw`\[${normalizeExpression(expression)}\]`)
    .replace(/\\\(([\s\S]*?)\\\)/g, (_, expression) => String.raw`\(${normalizeExpression(expression)}\)`)
    .replace(/\$\$([\s\S]*?)\$\$/g, (_, expression) => String.raw`\[${normalizeExpression(expression)}\]`)
    .replace(/(^|[^\\])\$([^$\n]+)\$/g, (_, prefix, expression) => `${prefix}${String.raw`\(${normalizeExpression(expression)}\)`}`);
}

function looksLikeStandaloneFormula(text) {
  const trimmed = text.trim();
  if (!trimmed || trimmed.length > 90 || /[¿?]/.test(trimmed)) return false;
  if (!/[=<>]|\\frac|\\sqrt|\\sum|\\oint|\\int/.test(trimmed)) return false;
  return /^[A-Za-z0-9\\_\^{}\s+\-*/=().,|<>·]+$/.test(trimmed);
}

export function toDisplayLatex(value) {
  if (!value) return "";
  const text = normalizeLatexCommands(String(value)).trim();
  if (!text) return "";
  if (isDelimited(text)) return normalizeDelimitedMath(text);
  return text
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => String.raw`\[${normalizeExpression(part)}\]`)
    .join("\n");
}

export function toInlineLatex(value) {
  if (!value) return "";
  const text = normalizeLatexCommands(String(value)).trim();
  if (!text) return "";
  if (isDelimited(text)) return normalizeDelimitedMath(text);
  return String.raw`\(${normalizeExpression(text)}\)`;
}

function replaceInlineFormulas(text) {
  let next = normalizeDelimitedMath(text);
  INLINE_REPLACEMENTS.forEach((plain) => {
    if (!next.includes(plain)) return;
    next = next.replace(new RegExp(escapeRegExp(plain), "g"), toInlineLatex(plain));
  });
  return transformOutsideMath(next, replaceLooseMathTokens);
}

function transformOutsideMath(text, transform) {
  const mathPattern = /(\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)|\$\$[\s\S]*?\$\$|\$[^$]*\$)/g;
  let cursor = 0;
  let output = "";
  let match = mathPattern.exec(text);
  while (match) {
    output += transform(text.slice(cursor, match.index));
    output += match[0];
    cursor = match.index + match[0].length;
    match = mathPattern.exec(text);
  }
  output += transform(text.slice(cursor));
  return output;
}

function wrapMath(expression) {
  return String.raw`\(${expression}\)`;
}

function replaceLooseMathTokens(segment) {
  return segment
    .replace(/\bm\/s\^?2\b/g, wrapMath(String.raw`\mathrm{m/s^2}`))
    .replace(/\bm\^2\/s\^2\b/g, wrapMath(String.raw`\mathrm{m^2/s^2}`))
    .replace(/\bW\/m\^?2\b/g, wrapMath(String.raw`\mathrm{W/m^2}`))
    .replace(/\bJ\/\(kg[· ]K\)\b/g, wrapMath(String.raw`\mathrm{J/(kg\cdot K)}`))
    .replace(/\bJ\/kg K\b/g, wrapMath(String.raw`\mathrm{J/(kg\cdot K)}`))
    .replace(/\bN\/C\b/g, wrapMath(String.raw`\mathrm{N/C}`))
    .replace(/\bV\/m\b/g, wrapMath(String.raw`\mathrm{V/m}`))
    .replace(/\bJ\/C\b/g, wrapMath(String.raw`\mathrm{J/C}`))
    .replace(/\bC\/s\b/g, wrapMath(String.raw`\mathrm{C/s}`))
    .replace(/\brad\/s\b/g, wrapMath(String.raw`\mathrm{rad/s}`))
    .replace(/\bJ\/K\b/g, wrapMath(String.raw`\mathrm{J/K}`))
    .replace(/\bK\/W\b/g, wrapMath(String.raw`\mathrm{K/W}`))
    .replace(/\bm\/s(?!\^?2)\b/g, wrapMath(String.raw`\mathrm{m/s}`))
    .replace(/(?<![/{\\])\bm2\b/g, wrapMath(String.raw`\mathrm{m^2}`))
    .replace(/(?<![/{\\])\bm\^2\b/g, wrapMath(String.raw`\mathrm{m^2}`))
    .replace(/\bHz\b/g, wrapMath(String.raw`\mathrm{Hz}`))
    .replace(/\bWb\b/g, wrapMath(String.raw`\mathrm{Wb}`))
    .replace(/\bohm\b/g, wrapMath(String.raw`\Omega`))
    .replace(/\bohmio\b/g, wrapMath(String.raw`\Omega`))
    .replace(/\bv0\b/g, wrapMath("v_0"))
    .replace(/\bx0\b/g, wrapMath("x_0"))
    .replace(/\bq1\b/g, wrapMath("q_1"))
    .replace(/\bq2\b/g, wrapMath("q_2"))
    .replace(/\bf1\b/g, wrapMath("f_1"))
    .replace(/\bf2\b/g, wrapMath("f_2"))
    .replace(/\bn1\b/g, wrapMath("n_1"))
    .replace(/\bn2\b/g, wrapMath("n_2"))
    .replace(/\bI0\b/g, wrapMath("I_0"))
    .replace(/\bE0\b/g, wrapMath("E_0"))
    .replace(/\btheta_c\b/g, wrapMath(String.raw`\theta_c`))
    .replace(/\btheta1\b/g, wrapMath(String.raw`\theta_1`))
    .replace(/\btheta2\b/g, wrapMath(String.raw`\theta_2`))
    .replace(/\blambda\b/g, wrapMath(String.raw`\lambda`))
    .replace(/\bomega\b/g, wrapMath(String.raw`\omega`))
    .replace(/\btheta\b/g, wrapMath(String.raw`\theta`))
    .replace(/\bDeltaT\b/g, wrapMath(String.raw`\Delta T`))
    .replace(/\bDelta\s+([A-Z])\b/g, (_, symbol) => wrapMath(String.raw`\Delta ${symbol}`))
    .replace(/\bPhi\b/g, wrapMath(String.raw`\Phi`))
    .replace(/\bepsilon0\b/g, wrapMath(String.raw`\varepsilon_0`))
    .replace(/\bmu0\b/g, wrapMath(String.raw`\mu_0`))
    .replace(/\bpi\b/g, wrapMath(String.raw`\pi`))
    .replace(/\b1\/2\b/g, wrapMath(String.raw`\frac{1}{2}`))
    .replace(/\b([trTv])\^([234])\b/g, (_, symbol, exponent) => wrapMath(`${symbol}^{${exponent}}`))
    .replace(/\br\^2\b/g, wrapMath("r^2"));
}

export function normalizeMathText(value, { block = false } = {}) {
  if (value === null || value === undefined) return "";
  const text = normalizeLatexCommands(String(value));
  if (!text.trim()) return "";
  if (isDelimited(text)) return normalizeDelimitedMath(text);
  if (block) return toDisplayLatex(text);
  if (looksLikeStandaloneFormula(text)) return toInlineLatex(text);
  return replaceInlineFormulas(text);
}
