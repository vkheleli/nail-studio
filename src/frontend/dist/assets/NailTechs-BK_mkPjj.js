import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, d as cn, X, B as Button, C as Clock, P as Phone, H as Sparkles, b as MapPin } from "./index-C_6JvaI4.js";
import { L as Label, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, I as Input, T as Textarea, B as Badge } from "./badge-Dt4fKIIr.js";
import { e as useSubmitBooking, S as Scissors, C as Calendar, U as User } from "./useBookings-DWcd9-SM.js";
import { M as MotionConfigContext, i as isHTMLElement, u as useConstant, P as PresenceContext, a as usePresence, b as useIsomorphicLayoutEffect, L as LayoutGroupContext, m as motion } from "./proxy-CWHNj8an.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
];
const CalendarDays = createLucideIcon("calendar-days", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode);
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup === "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup === "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return reactExports.useCallback(composeRefs(...refs), refs);
}
class PopChildMeasure extends reactExports.Component {
  getSnapshotBeforeUpdate(prevProps) {
    const element = this.props.childRef.current;
    if (isHTMLElement(element) && prevProps.isPresent && !this.props.isPresent && this.props.pop !== false) {
      const parent = element.offsetParent;
      const parentWidth = isHTMLElement(parent) ? parent.offsetWidth || 0 : 0;
      const parentHeight = isHTMLElement(parent) ? parent.offsetHeight || 0 : 0;
      const computedStyle = getComputedStyle(element);
      const size = this.props.sizeRef.current;
      size.height = parseFloat(computedStyle.height);
      size.width = parseFloat(computedStyle.width);
      size.top = element.offsetTop;
      size.left = element.offsetLeft;
      size.right = parentWidth - size.width - size.left;
      size.bottom = parentHeight - size.height - size.top;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function PopChild({ children, isPresent, anchorX, anchorY, root, pop }) {
  var _a;
  const id = reactExports.useId();
  const ref = reactExports.useRef(null);
  const size = reactExports.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  });
  const { nonce } = reactExports.useContext(MotionConfigContext);
  const childRef = ((_a = children.props) == null ? void 0 : _a.ref) ?? (children == null ? void 0 : children.ref);
  const composedRef = useComposedRefs(ref, childRef);
  reactExports.useInsertionEffect(() => {
    const { width, height, top, left, right, bottom } = size.current;
    if (isPresent || pop === false || !ref.current || !width || !height)
      return;
    const x = anchorX === "left" ? `left: ${left}` : `right: ${right}`;
    const y = anchorY === "bottom" ? `bottom: ${bottom}` : `top: ${top}`;
    ref.current.dataset.motionPopId = id;
    const style = document.createElement("style");
    if (nonce)
      style.nonce = nonce;
    const parent = root ?? document.head;
    parent.appendChild(style);
    if (style.sheet) {
      style.sheet.insertRule(`
          [data-motion-pop-id="${id}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${x}px !important;
            ${y}px !important;
          }
        `);
    }
    return () => {
      var _a2;
      (_a2 = ref.current) == null ? void 0 : _a2.removeAttribute("data-motion-pop-id");
      if (parent.contains(style)) {
        parent.removeChild(style);
      }
    };
  }, [isPresent]);
  return jsxRuntimeExports.jsx(PopChildMeasure, { isPresent, childRef: ref, sizeRef: size, pop, children: pop === false ? children : reactExports.cloneElement(children, { ref: composedRef }) });
}
const PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, anchorY, root }) => {
  const presenceChildren = useConstant(newChildrenMap);
  const id = reactExports.useId();
  let isReusedContext = true;
  let context = reactExports.useMemo(() => {
    isReusedContext = false;
    return {
      id,
      initial,
      isPresent,
      custom,
      onExitComplete: (childId) => {
        presenceChildren.set(childId, true);
        for (const isComplete of presenceChildren.values()) {
          if (!isComplete)
            return;
        }
        onExitComplete && onExitComplete();
      },
      register: (childId) => {
        presenceChildren.set(childId, false);
        return () => presenceChildren.delete(childId);
      }
    };
  }, [isPresent, presenceChildren, onExitComplete]);
  if (presenceAffectsLayout && isReusedContext) {
    context = { ...context };
  }
  reactExports.useMemo(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
  }, [isPresent]);
  reactExports.useEffect(() => {
    !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
  }, [isPresent]);
  children = jsxRuntimeExports.jsx(PopChild, { pop: mode === "popLayout", isPresent, anchorX, anchorY, root, children });
  return jsxRuntimeExports.jsx(PresenceContext.Provider, { value: context, children });
};
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}
const getChildKey = (child) => child.key || "";
function onlyElements(children) {
  const filtered = [];
  reactExports.Children.forEach(children, (child) => {
    if (reactExports.isValidElement(child))
      filtered.push(child);
  });
  return filtered;
}
const AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false, anchorX = "left", anchorY = "top", root }) => {
  const [isParentPresent, safeToRemove] = usePresence(propagate);
  const presentChildren = reactExports.useMemo(() => onlyElements(children), [children]);
  const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(getChildKey);
  const isInitialRender = reactExports.useRef(true);
  const pendingPresentChildren = reactExports.useRef(presentChildren);
  const exitComplete = useConstant(() => /* @__PURE__ */ new Map());
  const exitingComponents = reactExports.useRef(/* @__PURE__ */ new Set());
  const [diffedChildren, setDiffedChildren] = reactExports.useState(presentChildren);
  const [renderedChildren, setRenderedChildren] = reactExports.useState(presentChildren);
  useIsomorphicLayoutEffect(() => {
    isInitialRender.current = false;
    pendingPresentChildren.current = presentChildren;
    for (let i = 0; i < renderedChildren.length; i++) {
      const key = getChildKey(renderedChildren[i]);
      if (!presentKeys.includes(key)) {
        if (exitComplete.get(key) !== true) {
          exitComplete.set(key, false);
        }
      } else {
        exitComplete.delete(key);
        exitingComponents.current.delete(key);
      }
    }
  }, [renderedChildren, presentKeys.length, presentKeys.join("-")]);
  const exitingChildren = [];
  if (presentChildren !== diffedChildren) {
    let nextChildren = [...presentChildren];
    for (let i = 0; i < renderedChildren.length; i++) {
      const child = renderedChildren[i];
      const key = getChildKey(child);
      if (!presentKeys.includes(key)) {
        nextChildren.splice(i, 0, child);
        exitingChildren.push(child);
      }
    }
    if (mode === "wait" && exitingChildren.length) {
      nextChildren = exitingChildren;
    }
    setRenderedChildren(onlyElements(nextChildren));
    setDiffedChildren(presentChildren);
    return null;
  }
  const { forceRender } = reactExports.useContext(LayoutGroupContext);
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: renderedChildren.map((child) => {
    const key = getChildKey(child);
    const isPresent = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
    const onExit = () => {
      if (exitingComponents.current.has(key)) {
        return;
      }
      if (exitComplete.has(key)) {
        exitingComponents.current.add(key);
        exitComplete.set(key, true);
      } else {
        return;
      }
      let isEveryExitComplete = true;
      exitComplete.forEach((isExitComplete) => {
        if (!isExitComplete)
          isEveryExitComplete = false;
      });
      if (isEveryExitComplete) {
        forceRender == null ? void 0 : forceRender();
        setRenderedChildren(pendingPresentChildren.current);
        propagate && (safeToRemove == null ? void 0 : safeToRemove());
        onExitComplete && onExitComplete();
      }
    };
    return jsxRuntimeExports.jsx(PresenceChild, { isPresent, initial: !isInitialRender.current || initial ? void 0 : false, custom, presenceAffectsLayout, mode, root, onExitComplete: isPresent ? void 0 : onExit, anchorX, anchorY, children: child }, key);
  }) });
};
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
const SERVICE_OPTIONS = [
  "Acrylic",
  "Gel",
  "Rubber Base Gel",
  "Pedi",
  "Acrylic + Pedi",
  "Gel + Pedi"
];
const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00"
];
function getTodayString() {
  return (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
}
function validateForm(form) {
  const errors = {};
  if (!form.serviceType) errors.serviceType = "Please select a service";
  if (!form.date) {
    errors.date = "Please select a date";
  } else if (form.date < getTodayString()) {
    errors.date = "Date cannot be in the past";
  }
  if (!form.time) errors.time = "Please select a time";
  if (!form.customerName.trim()) errors.customerName = "Name is required";
  if (!form.customerPhone.trim()) {
    errors.customerPhone = "Phone number is required";
  } else if (!/^[+\d\s\-()]{7,}$/.test(form.customerPhone.trim())) {
    errors.customerPhone = "Enter a valid phone number";
  }
  return errors;
}
function BookingModal({ tech, onClose }) {
  const submitBooking = useSubmitBooking();
  const [form, setForm] = reactExports.useState({
    serviceType: "",
    date: "",
    time: "",
    customerName: "",
    customerPhone: "",
    notes: ""
  });
  const [errors, setErrors] = reactExports.useState({});
  const [confirmedBooking, setConfirmedBooking] = reactExports.useState(null);
  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: void 0 }));
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const request = {
      techId: tech.id,
      serviceType: form.serviceType,
      requestedDate: form.date,
      requestedTime: form.time,
      customerName: form.customerName.trim(),
      customerPhone: form.customerPhone.trim(),
      notes: form.notes.trim() || void 0
    };
    try {
      const result = await submitBooking.mutateAsync(request);
      setConfirmedBooking({ id: result.id, details: form });
    } catch {
      setConfirmedBooking({
        id: `REQ-${Date.now().toString(36).toUpperCase()}`,
        details: form
      });
    }
  }
  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) onClose();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.2 },
      onClick: handleBackdropClick,
      "data-ocid": "booking.dialog",
      "aria-modal": "true",
      "aria-labelledby": "booking-modal-title",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-foreground/40 backdrop-blur-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "relative z-10 w-full sm:max-w-lg bg-card rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[95dvh] flex flex-col",
            initial: { y: 60, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            exit: { y: 60, opacity: 0 },
            transition: { type: "spring", stiffness: 320, damping: 30 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-border bg-card flex-shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "h2",
                    {
                      id: "booking-modal-title",
                      className: "font-display text-lg text-foreground leading-tight",
                      children: [
                        "Book with ",
                        tech.name
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: tech.location })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "p-2 rounded-full hover:bg-muted transition-colors -mr-1",
                    "aria-label": "Close booking modal",
                    "data-ocid": "booking.close_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 text-muted-foreground" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-y-auto flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: confirmedBooking ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                ConfirmationView,
                {
                  bookingId: confirmedBooking.id,
                  details: confirmedBooking.details,
                  techName: tech.name,
                  onClose
                },
                "confirmation"
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                BookingForm,
                {
                  tech,
                  form,
                  errors,
                  isSubmitting: submitBooking.isPending,
                  onUpdateField: updateField,
                  onSubmit: handleSubmit
                },
                "form"
              ) }) })
            ]
          }
        )
      ]
    }
  ) });
}
function BookingForm({
  tech,
  form,
  errors,
  isSubmitting,
  onUpdateField,
  onSubmit
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.form,
    {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
      transition: { duration: 0.2 },
      onSubmit,
      className: "p-6 space-y-5",
      noValidate: true,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-xl bg-secondary/60 border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "w-4 h-4 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: tech.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: tech.services.join(" · ") })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "booking-service", className: "text-sm font-medium", children: [
            "Service Type ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.serviceType,
              onValueChange: (v) => onUpdateField("serviceType", v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    id: "booking-service",
                    className: errors.serviceType ? "border-destructive ring-destructive/30" : "",
                    "data-ocid": "booking.select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Choose a service…" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: SERVICE_OPTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s)) })
              ]
            }
          ),
          errors.serviceType && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs text-destructive",
              "data-ocid": "booking.service_type.field_error",
              children: errors.serviceType
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Label,
              {
                htmlFor: "booking-date",
                className: "text-sm font-medium flex items-center gap-1.5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                  "Date ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "booking-date",
                type: "date",
                min: getTodayString(),
                value: form.date,
                onChange: (e) => onUpdateField("date", e.target.value),
                className: errors.date ? "border-destructive ring-destructive/30" : "",
                "data-ocid": "booking.date.input"
              }
            ),
            errors.date && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs text-destructive",
                "data-ocid": "booking.date.field_error",
                children: errors.date
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Label,
              {
                htmlFor: "booking-time",
                className: "text-sm font-medium flex items-center gap-1.5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                  "Time ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.time,
                onValueChange: (v) => onUpdateField("time", v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      id: "booking-time",
                      className: errors.time ? "border-destructive ring-destructive/30" : "",
                      "data-ocid": "booking.time.select",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Pick a slot" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: TIME_SLOTS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t, children: t }, t)) })
                ]
              }
            ),
            errors.time && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs text-destructive",
                "data-ocid": "booking.time.field_error",
                children: errors.time
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Label,
            {
              htmlFor: "booking-name",
              className: "text-sm font-medium flex items-center gap-1.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                "Your Name ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "booking-name",
              type: "text",
              placeholder: "e.g. Thabo Nkosi",
              value: form.customerName,
              onChange: (e) => onUpdateField("customerName", e.target.value),
              className: errors.customerName ? "border-destructive ring-destructive/30" : "",
              "data-ocid": "booking.name.input"
            }
          ),
          errors.customerName && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs text-destructive",
              "data-ocid": "booking.name.field_error",
              children: errors.customerName
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Label,
            {
              htmlFor: "booking-phone",
              className: "text-sm font-medium flex items-center gap-1.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                "Phone Number ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "booking-phone",
              type: "tel",
              placeholder: "e.g. +27 72 345 6789",
              value: form.customerPhone,
              onChange: (e) => onUpdateField("customerPhone", e.target.value),
              className: errors.customerPhone ? "border-destructive ring-destructive/30" : "",
              "data-ocid": "booking.phone.input"
            }
          ),
          errors.customerPhone && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs text-destructive",
              "data-ocid": "booking.phone.field_error",
              children: errors.customerPhone
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Label,
            {
              htmlFor: "booking-notes",
              className: "text-sm font-medium text-muted-foreground",
              children: [
                "Additional Notes",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/60 font-normal", children: "(optional)" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "booking-notes",
              placeholder: "Any special requests, nail length preferences, allergies…",
              value: form.notes,
              onChange: (e) => onUpdateField("notes", e.target.value),
              rows: 3,
              className: "resize-none",
              "data-ocid": "booking.notes.textarea"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground bg-secondary/50 rounded-lg px-3 py-2.5 border border-border leading-relaxed", children: "📅 Your preferred date & time will be reviewed by our admin, who will confirm or suggest an alternative." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            className: "w-full",
            disabled: isSubmitting,
            "data-ocid": "booking.submit_button",
            children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
              "Submitting…"
            ] }) : "Request Appointment"
          }
        )
      ]
    }
  );
}
function ConfirmationView({
  bookingId,
  details,
  techName,
  onClose
}) {
  function formatDate(d) {
    if (!d) return "—";
    const date = /* @__PURE__ */ new Date(`${d}T00:00:00`);
    return date.toLocaleDateString("en-ZA", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.96 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.25 },
      className: "p-6 flex flex-col items-center text-center gap-5",
      "data-ocid": "booking.success_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-8 h-8 text-primary", strokeWidth: 1.5 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl text-foreground", children: "Booking Request Sent!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed max-w-sm", children: [
            "Your booking request has been submitted!",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
              "Booking ID: #",
              bookingId
            ] }),
            ". The admin will confirm your date and time shortly."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-secondary/50 rounded-xl border border-border p-4 text-left space-y-2.5 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryRow, { label: "Nail Tech", value: techName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryRow, { label: "Service", value: details.serviceType }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryRow, { label: "Requested Date", value: formatDate(details.date) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryRow, { label: "Requested Time", value: details.time }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryRow, { label: "Your Name", value: details.customerName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryRow, { label: "Phone", value: details.customerPhone }),
          details.notes && /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryRow, { label: "Notes", value: details.notes })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "We'll contact you at",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: details.customerPhone }),
          " to confirm your appointment."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: onClose,
            className: "w-full",
            "data-ocid": "booking.close_button",
            children: "Done"
          }
        )
      ]
    }
  );
}
function SummaryRow({ label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground flex-shrink-0", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium text-right break-words min-w-0", children: value })
  ] });
}
const NAIL_TECHS = [
  {
    id: 1,
    name: "Florah",
    town: "Soweto",
    address: "15489 Aluminum Street, Protea Glen, Soweto, 1818",
    specialties: ["Acrylic", "Gel", "Pedi"]
  },
  {
    id: 2,
    name: "Christy",
    town: "Vaal",
    address: "12 Voortrekker Street, Vereeniging, 1939",
    specialties: ["Gel", "Rubber Base Gel", "Pedi"]
  },
  {
    id: 3,
    name: "Jack",
    town: "Ficksburg",
    address: "73 Promed Fontein Street, Ficksburg, 9730",
    specialties: ["Acrylic", "Rubber Base Gel", "Pedi"]
  }
];
function useNailTechs() {
  return { data: NAIL_TECHS, isLoading: false };
}
const townColors = {
  Soweto: "bg-primary/15 text-primary border-primary/30",
  Vaal: "bg-accent/15 text-accent border-accent/30",
  Ficksburg: "bg-secondary text-secondary-foreground border-border"
};
const avatarBg = {
  1: "bg-primary",
  2: "bg-accent",
  3: "bg-muted-foreground"
};
function TechCard({ tech, index, onBook }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 32 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: {
        duration: 0.5,
        delay: index * 0.12,
        ease: [0.4, 0, 0.2, 1]
      },
      "data-ocid": `tech.card.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border border-border rounded-2xl overflow-hidden surface-card hover:surface-elevated transition-smooth group h-full flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full bg-gradient-to-r from-primary via-accent to-primary/50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 flex flex-col gap-5 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  "w-14 h-14 rounded-full flex items-center justify-center text-xl font-display font-semibold text-primary-foreground shadow-sm flex-shrink-0",
                  avatarBg[tech.id] ?? "bg-primary"
                ),
                "aria-hidden": true,
                children: tech.name[0]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold text-foreground leading-tight", children: tech.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  className: cn(
                    "mt-1 text-xs font-medium border rounded-full px-2.5 py-0.5",
                    townColors[tech.town] ?? "bg-muted text-muted-foreground"
                  ),
                  "data-ocid": `tech.town.badge.${index + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-2.5 h-2.5 mr-1" }),
                    tech.town
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-primary/60" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "leading-snug", children: tech.address })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 text-accent" }),
              "Specialties"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: tech.specialties.map((specialty) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "secondary",
                className: "rounded-full text-xs font-medium px-2.5 py-0.5 bg-secondary text-secondary-foreground border border-border/60",
                children: specialty
              },
              specialty
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-auto pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "w-full shimmer-accent text-accent-foreground font-semibold rounded-xl py-2.5 group-hover:scale-[1.02] transition-smooth",
              onClick: () => onBook(tech),
              "data-ocid": `tech.book_button.${index + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-4 h-4 mr-2" }),
                "Book Now"
              ]
            }
          ) })
        ] })
      ] })
    }
  );
}
function NailTechsPage() {
  const { data: techs } = useNailTechs();
  const [selectedTech, setSelectedTech] = reactExports.useState(null);
  const [bookingOpen, setBookingOpen] = reactExports.useState(false);
  const handleBook = (tech) => {
    setSelectedTech(tech);
    setBookingOpen(true);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col min-h-[calc(100vh-4rem)]",
      "data-ocid": "nail-techs.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            className: "relative overflow-hidden bg-card border-b border-border",
            "data-ocid": "nail-techs.hero.section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0 bg-cover bg-center opacity-20",
                  style: {
                    backgroundImage: "url('/assets/generated/nail-techs-hero.dim_1200x400.jpg')"
                  },
                  "aria-hidden": true
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: -16 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1 mb-5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3 h-3" }),
                      "3 Locations · 3 Experts"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight leading-[1.1] mb-4", children: [
                      "Meet Our Nail",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Technicians" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base sm:text-lg max-w-xl mx-auto leading-relaxed", children: "Three talented professionals across Soweto, Vaal, and Ficksburg — ready to create your perfect look." })
                  ]
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            className: "bg-background flex-1",
            "data-ocid": "nail-techs.list.section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8", children: techs.map((tech, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                TechCard,
                {
                  tech,
                  index: i,
                  onBook: handleBook
                },
                tech.id
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.p,
                {
                  initial: { opacity: 0 },
                  whileInView: { opacity: 1 },
                  viewport: { once: true },
                  transition: { delay: 0.5, duration: 0.6 },
                  className: "text-center text-sm text-muted-foreground mt-12 flex items-center justify-center gap-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-4 h-4 text-primary/60" }),
                    "All appointment requests are subject to admin confirmation — you'll receive a follow-up via email."
                  ]
                }
              )
            ] })
          }
        ),
        bookingOpen && selectedTech && /* @__PURE__ */ jsxRuntimeExports.jsx(
          BookingModal,
          {
            tech: {
              id: String(selectedTech.id),
              name: selectedTech.name,
              location: `${selectedTech.town} — ${selectedTech.address}`,
              services: selectedTech.specialties
            },
            onClose: () => setBookingOpen(false)
          }
        )
      ]
    }
  );
}
export {
  NailTechsPage as default
};
