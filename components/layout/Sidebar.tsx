interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed z-40 inset-y-0 left-0 w-64 bg-white shadow transform transition-transform duration-200 ease-in-out
        ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:shadow-none`}
      >
        <div className="h-full flex flex-col p-4 space-y-4">
          <h2 className="text-xl font-bold">Troupe Chat</h2>
          <nav className="flex flex-col space-y-2">
            <a
              href="/conversations"
              className="text-gray-700 hover:text-blue-600"
            >
              Conversations
            </a>
            <a href="/troupes" className="text-gray-700 hover:text-blue-600">
              Troupes
            </a>
            <a href="/profile" className="text-gray-700 hover:text-blue-600">
              Profile
            </a>
          </nav>
        </div>
      </aside>
    </>
  );
}
