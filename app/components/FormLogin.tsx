export default function FormLogin() {
  return (
    <div className="p-6 shadow-customShadow solid rounded-xl flex flex-col gap-4 w-80">
      <h1 className="text-3xl font-semibold">Login</h1>
      <form action="" className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm">
            E-mail
          </label>
          <input
            type="text"
            placeholder="Type your email"
            id="email"
            className="outline-none border py-2 px-4 rounded-lg text-sm"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm">
            Password
          </label>
          <input
            type="text"
            placeholder="Type your password"
            id="password"
            className="outline-none border py-2 px-4 rounded-lg text-sm"
          />
        </div>
        <button className="bg-accent text-lightColor rounded-lg w-full p-2 mt-4 transition-all duration-300 hover:brightness-90">
          Log in
        </button>
      </form>
    </div>
  );
}
