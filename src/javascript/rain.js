const [sidewalk, rain] = process.argv.slice(2)

const { random } = Math

export const drip = sidewalk => (droplet = { diameter: 1, location: random() * sidewalk }) =>
  sidewalk.root === null || sidewalk.root === undefined   // if the sidewalk does not have a root
    ? sidewalk.root = droplet                             // set the root to the droplet
    : sidewalk.root.location >= droplet.location          // otherwise, if the root's location is greater than or equal to the droplet
      ? drip(sidewalk.left)(droplet)                      // take the left branch
      : drip(sidewalk.right)(droplet)                     // otherwise, take the right branch
