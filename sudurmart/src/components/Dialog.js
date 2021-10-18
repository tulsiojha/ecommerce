/** @format */

export default function Dialog(params) {
  const { open, z, onAccept, onCancel, accept, cancel } = params;
  return (
    <div class={`modal z-${z} ${open && "modal-open"}`}>
      <div class="modal-box">
        <p>{params.children}</p>
        <div class="modal-action">
          <button class="btn btn-primary" onClick={onAccept}>
            {accept}
          </button>
          <button class="btn" onClick={onCancel}>
            {cancel}
          </button>
        </div>
      </div>
    </div>
  );
}
