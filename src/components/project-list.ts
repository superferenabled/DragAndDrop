import { DragTarget } from "../models/drag-drop";
import { Component } from "./base-component";
import { Autobind } from "../decorators/autobind";
import { Project, ProjectStatus } from "../models/project";
import { projectState } from "../state/project";
import { ProjectItem } from "./project-item";

// Project List Class
export class ProjectList extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget {
  private assignedProjects: Project[];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);
    this.assignedProjects = [];
    this.configure();
    this.renderContent();
  }

  @Autobind
  dragOverHandler(_event: DragEvent) {
    if (_event.dataTransfer?.types[0] === "text/plain") {
      _event.preventDefault();
      const listEl = this.element.querySelector("ul");
      listEl?.classList.add("droppable");
    }
  }

  @Autobind
  dropHanlder(_event: DragEvent) {
    const prjId = _event.dataTransfer?.getData("text/plain")! as string;
    projectState.moveProject(
      prjId,
      this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }

  @Autobind
  dragLeaveHandler(_event: DragEvent) {
    const listEl = this.element.querySelector("ul");
    listEl?.classList.remove("droppable");
  }

  configure(): void {
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    this.element.addEventListener("drop", this.dropHanlder);
    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter((prj) => {
        if (this.type === "active") {
          return prj.status === ProjectStatus.Active;
        }
        return prj.status === ProjectStatus.Finished;
      });
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    listEl.innerHTML = "";
    for (const prjItem of this.assignedProjects) {
      console.log(prjItem);
      new ProjectItem(this.element.querySelector("ul")!.id, prjItem);
    }
  }
}
