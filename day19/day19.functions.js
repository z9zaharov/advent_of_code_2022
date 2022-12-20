/**
 * --- Day 19: Not Enough Minerals ---
 */

function parseInputData(data) {
  return data.map(line => {
    let blueprintId = parseInt(line.split(':')[0].split(' ')[1]);
    let blueprint = line.split(':')[1].split('.');

    let oreCost = parseInt(blueprint[0].substring('Each'.length).split('robot costs')[1].trim().split(' ')[0]);
    let clayCost = parseInt(blueprint[1].substring('Each'.length).split('robot costs')[1].trim().split(' ')[0]);

    let obsidianCosts = blueprint[2].substring('Each'.length).split('robot costs')[1].split(' and ');
    let obsidianOreCost = parseInt(obsidianCosts[0].trim().split(' ')[0]);
    let obsidianClayCost = parseInt(obsidianCosts[1].trim().split(' ')[0]);

    let geodeCosts = blueprint[3].substring('Each'.length).split('robot costs')[1].split(' and ');
    let geodeOreCost = parseInt(geodeCosts[0].trim().split(' ')[0]);
    let geodeClayCost = parseInt(geodeCosts[1].trim().split(' ')[0]);

    return {
      ore: { ore: oreCost },
      clay: { ore: clayCost },
      obsidian: { ore: obsidianOreCost, clay: obsidianClayCost },
      geode: { ore: geodeOreCost, obsidian: geodeClayCost }
    }
  });
}

const Minerals = function () {

  this.Types = ['ore', 'clay', 'obsidian', 'geode'];
/*
  this.canProduce = (blueprint, resources) => {
    if (blueprint && resources) {
      return Object.keys(blueprint).every(subType => {
        return (subType in resources) && resources[subType] >= blueprint[subType];
      })
    }
    return false;
  }
*/
  this.hashBlueprint = (blueprint) => {
    let hashedBlueprint = {};
    
    Object.keys(blueprint).forEach(type => {
      hashedBlueprint[type] = [0, 0, 0, 0];
      Object.keys(blueprint[type]).forEach(subType => {
        let i = this.Types.indexOf(subType);
        hashedBlueprint[type][i] = blueprint[type][subType];
      });
    });

    return hashedBlueprint;
  }

  this.canProduce = (hashedBlueprint, resources) => {
    return resources.every((val, i) => (val - hashedBlueprint[i]) >= 0);
  }
/*
  this.produce = (blueprint, robots, resources, type) => {
    if (type) {
      Object.keys(blueprint).forEach(subType => {
        resources[subType] -= blueprint[subType];
      });
  
      robots[type] = (type in robots) ? robots[type] + 1 : 1;
  
      if(!(type in resources)) {
        resources[type] = 0;
      };
    }
  }
*/
  this.mine = (blueprint, robots, resources) => {
    for(let i = 0; i < robots.length; i ++) {
      resources[i] = resources[i] + robots[i] - blueprint[i];
    }
  }
/*
  this.mineExisting = (robots) => {
    return Object.keys(robots).reduce((resources, type) => {
      resources[type] = robots[type];
      return resources;
    }, {});
  }

  this.addResources = (resources, newResources) => {
    Object.keys(newResources).forEach(type => {
      resources[type] = ((type in resources) && resources[type]) ? resources[type] + newResources[type] : newResources[type];
    });
  }

  this.mine = (blueprint, robots, resources, type) => {
    let newResources = this.mineExisting(robots);

    if (type && this.canProduce(blueprint[type], resources)) {
      this.produce(blueprint[type], robots, resources, type);
    }
    
    this.addResources(resources, newResources);
  }
*/
  this.availableToProduce = (blueprint, resources) => {
    return [0, ...this.Types.filter(type => this.canProduce(blueprint[type], resources))];
  }


  this.collect = (blueprint, robots, resources, minutes) => {
    let states = [{robots: robots, resources: resources}];
    
    for (let minute = 0; minute < minutes; minute ++) {

      let newStates = [];
      for (let state of states) {
        let types = this.availableToProduce(blueprint, state.resources);
        for(let i = types.length - 1; i >= 0; i --) {
          let copyRobots = [...state.robots];
          let copyResources = [...state.resources];

          let type = types[i];
          if (type) {
            this.mine(blueprint[type], copyRobots, copyResources);
            let idx = this.Types.indexOf(type);
            copyRobots[idx] ++;
          }
          else {
            this.mine([0, 0, 0, 0], copyRobots, copyResources);
          }

          newStates.push({robots: copyRobots, resources: copyResources});
        }
      }

      let fitnesses = newStates.map(state => {
        return (state.resources[3] + ((minutes - minute) * state.robots[3])) * 10000000 +
            state.robots[2] * 10000 +
            state.robots[1] * 100 +
            state.robots[0];
      });

      states = newStates
          .map((state, i) => ({ state, fitness: fitnesses[i] }))
          .sort((a, b) => b.fitness - a.fitness)
          .map(fitness => fitness.state)
          .slice(0, 20000);
    }

    states.sort((a, b) => b.resources[3] - a.resources[3]);
    return states[0].resources[3];
  }

  this.collectOptimal = (blueprint, minutes) => {
    return this.collect(this.hashBlueprint(blueprint), [1, 0, 0, 0], [0, 0, 0, 0], minutes);
  }

  this.qualityCollect = (blueprints, minutes) => {
    return blueprints.reduce((sum, blueprint, i) => {
      return sum + this.collectOptimal(blueprint, minutes) * (i + 1);
    }, 0);
  }

  this.firstThreeMultiply = (blueprints, minutes) => {
    return blueprints.splice(0, 3).reduce((mult, blueprint, i) => {
      return mult * this.collectOptimal(blueprint, minutes);
    }, 1);
  }
}

export { parseInputData, Minerals };
