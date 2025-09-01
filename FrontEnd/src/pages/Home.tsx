type HomeProps = {
  children?: React.ReactNode
}

function Home({ children }: HomeProps) {
  return (
    <div>
      <h1 className="text-xl lg:text-5xl md:text-4xl sm:text-3xl font-bold text-shadow-lg/40 ">
        Welcome to the To-Do List App
      </h1>
      {children}
    </div>
  )
}

export default Home
