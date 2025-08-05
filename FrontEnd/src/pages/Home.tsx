type HomeProps = {
  children?: React.ReactNode
}

function Home({ children }: HomeProps) {
  return (
    <div >
      <h1 className="text-3xl font-bold underline">Welcome to the To-Do List App</h1>
      {children}
    </div>
  )
}

export default Home
