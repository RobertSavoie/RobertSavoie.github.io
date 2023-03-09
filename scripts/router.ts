"use strict";

import Router = core.Router;

namespace core {

    export class Router {
        
        // Attributes
        private m_activeLink: string;
        private m_routingTable: string[];

        // Setters and Getters
        public get ActiveLink() : string {
            return this.m_activeLink;
        }

        set ActiveLink(link: string){
            this.m_activeLink = link;
        }

        //Constructors
        constructor(){
            this.m_activeLink = "";
            this.m_routingTable = [];
        }

        //public methods
        public Add (route : string) : void {
            this.m_routingTable.push(route);
        }

        public AddTable(routingTable : string[]) : void {
            this.m_routingTable = routingTable;
        }

        public Find(route : string) : number {
            return this.m_routingTable.indexOf(route);
        }

        public Remove(route : string) : boolean {
            if(this.Find(route) > -1){
                this.m_routingTable.splice(this.Find(route), 1);
                return true;
            }
            return false;
        }

        //public overrides
        public toString() : string{
            return this.m_routingTable.toString();
        }
    }
}

let router : core.Router = new core.Router();

router.AddTable([
    "/",
    "/home",
    "/about",
    "/contact",
    "/contact-list",
    "/edit",
    "/login",
    "/products",
    "/register",
    "/services"
]);

let route : string = location.pathname;

router.ActiveLink = (router.Find(route) > -1)
                    ? (route === "/" ) ? "home" : route.substring(1)
                    : ("404");